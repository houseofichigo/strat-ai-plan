import { UseCase } from '@/data/useCasesData';

export interface UserInteraction {
  useCaseId: string;
  action: 'view' | 'add_to_roadmap' | 'share';
  timestamp: number;
}

export class AnalyticsService {
  private interactions: UserInteraction[] = [];
  
  track(useCaseId: string, action: 'view' | 'add_to_roadmap' | 'share') {
    const interaction: UserInteraction = {
      useCaseId,
      action,
      timestamp: Date.now()
    };
    
    this.interactions.push(interaction);
    
    // Store in localStorage for persistence
    try {
      localStorage.setItem('usecase_analytics', JSON.stringify(this.interactions));
    } catch (error) {
      console.warn('Failed to store analytics:', error);
    }
    
    // Log for debugging in development only
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics tracked:', interaction);
    }
  }
  
  getPopularUseCases(): string[] {
    const counts = this.interactions.reduce((acc, interaction) => {
      acc[interaction.useCaseId] = (acc[interaction.useCaseId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([id]) => id);
  }
  
  getRecentlyViewed(): string[] {
    return this.interactions
      .filter(i => i.action === 'view')
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5)
      .map(i => i.useCaseId);
  }
  
  constructor() {
    // Load existing analytics from localStorage
    try {
      const stored = localStorage.getItem('usecase_analytics');
      if (stored) {
        this.interactions = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load analytics:', error);
    }
  }
}

export const analytics = new AnalyticsService();