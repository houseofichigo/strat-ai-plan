import { UseCase } from '@/data/useCasesData';

export function calculateSimilarity(useCase1: UseCase, useCase2: UseCase): number {
  if (useCase1.id === useCase2.id) return 0;
  
  let score = 0;
  
  // Industry similarity (30% weight)
  const industryOverlap = useCase1.industry.filter(i => useCase2.industry.includes(i)).length;
  const industryUnion = new Set([...useCase1.industry, ...useCase2.industry]).size;
  score += (industryOverlap / industryUnion) * 0.3;
  
  // Department similarity (25% weight)
  const deptOverlap = useCase1.department.filter(d => useCase2.department.includes(d)).length;
  const deptUnion = new Set([...useCase1.department, ...useCase2.department]).size;
  score += (deptOverlap / deptUnion) * 0.25;
  
  // AI Type similarity (25% weight)
  const aiOverlap = useCase1.aiType.filter(a => useCase2.aiType.includes(a)).length;
  const aiUnion = new Set([...useCase1.aiType, ...useCase2.aiType]).size;
  score += (aiOverlap / aiUnion) * 0.25;
  
  // Complexity similarity (10% weight)
  const complexityScore = useCase1.complexity === useCase2.complexity ? 1 : 0;
  score += complexityScore * 0.1;
  
  // Suitability similarity (10% weight)
  const suitabilityScore = useCase1.suitability === useCase2.suitability ? 1 : 0;
  score += suitabilityScore * 0.1;
  
  return score;
}

export function getSimilarUseCases(
  targetUseCase: UseCase, 
  allUseCases: UseCase[], 
  limit: number = 4
): UseCase[] {
  return allUseCases
    .map(useCase => ({
      useCase,
      similarity: calculateSimilarity(targetUseCase, useCase)
    }))
    .filter(item => item.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
    .map(item => item.useCase);
}

export function fuzzySearch(query: string, items: string[]): string[] {
  if (!query) return [];
  
  const queryLower = query.toLowerCase();
  
  return items
    .map(item => ({
      item,
      score: calculateFuzzyScore(queryLower, item.toLowerCase())
    }))
    .filter(result => result.score > 0.3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(result => result.item);
}

function calculateFuzzyScore(query: string, target: string): number {
  if (target.includes(query)) return 1;
  
  // Calculate edit distance based score
  const distance = levenshteinDistance(query, target);
  const maxLength = Math.max(query.length, target.length);
  
  return 1 - (distance / maxLength);
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

export function getSearchSuggestions(query: string, useCases: UseCase[]): string[] {
  const allTerms = [
    ...new Set([
      ...useCases.flatMap(uc => uc.title.split(' ')),
      ...useCases.flatMap(uc => uc.industry),
      ...useCases.flatMap(uc => uc.department),
      ...useCases.flatMap(uc => uc.aiType)
    ])
  ];
  
  return fuzzySearch(query, allTerms);
}