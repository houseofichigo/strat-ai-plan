import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { trainingCoursesData, trainingCategories, sampleLearningProfiles, getPersonalizedTraining, getTrainingRecommendation } from '@/data/trainingCoursesData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play, Plus, Heart, Clock, Users, Star, Award, BookOpen, Target, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TrainingCenter() {
  // Using sample learning profile for demonstration
  const currentUser = sampleLearningProfiles[0]; // Data Manager
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const personalizedCourses = useMemo(() => getPersonalizedTraining(currentUser), [currentUser]);

  const handlePreview = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleEnroll = (course) => {
    toast.success(`Enrolled in "${course.title}"!`);
  };

  const handleAddToPath = (course) => {
    toast.success(`"${course.title}" added to learning path!`);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      case 'Executive': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Banner with Learning Progress */}
      <div className="px-6 pt-6 mb-8">
        <Card className="border-0 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 overflow-hidden">
          <CardContent className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="max-w-xl">
                <Badge className="mb-4 bg-accent text-accent-foreground">
                  Personalized for {currentUser.role}
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  Your AI Learning Journey
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Skills-first training designed for your roadmap items and career progression
                </p>
                
                {/* Learning Progress */}
                <div className="mb-6 p-4 bg-background/80 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Learning Path Progress</span>
                    <span className="text-sm font-bold">68% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div className="bg-primary h-3 rounded-full transition-all duration-500" style={{ width: '68%' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">14 of 24 courses completed • 3 in progress</p>
                </div>

                <div className="flex gap-4">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Play className="w-5 h-5 mr-2" />
                    Continue Learning
                  </Button>
                  <Button size="lg" variant="outline">
                    <Target className="w-5 h-5 mr-2" />
                    View Learning Path
                  </Button>
                </div>
              </div>

              {/* Skills Dashboard */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Your Skills & Achievements</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-background/80 rounded-lg">
                    <Award className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                    <div className="text-2xl font-bold text-primary">8</div>
                    <div className="text-sm text-muted-foreground">Skill Badges</div>
                  </div>
                  <div className="text-center p-4 bg-background/80 rounded-lg">
                    <Star className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                    <div className="text-2xl font-bold text-primary">2</div>
                    <div className="text-sm text-muted-foreground">Certificates</div>
                  </div>
                </div>

                {/* Recent Skill Badges */}
                <div className="p-4 bg-background/80 rounded-lg">
                  <h4 className="font-medium mb-3">Recent Achievements</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      AI Fundamentals
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Prompt Engineering
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Workflow Automation
                    </Badge>
                  </div>
                </div>

                {/* Skill Gaps */}
                <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h4 className="font-medium mb-2 text-orange-800 dark:text-orange-200">Recommended Next</h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Complete "Data Analysis" training to unlock advanced AI agents in your roadmap
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personalized Category Rows */}
      <div className="px-6">
        {trainingCategories.map((category) => {
          const categoryCourses = personalizedCourses.filter(category.filter);
          if (categoryCourses.length === 0) return null;

          return (
            <div key={category.id} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <Button variant="ghost" className="text-primary">View All</Button>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-4">
                {categoryCourses.map((course) => (
                  <div key={course.id} className="flex-none w-80">
                    <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl bg-card border-border cursor-pointer h-full">
                      <CardContent className="p-0">
                        {/* Header */}
                        <div className="relative h-24 bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center p-4">
                          <div className="text-3xl">{course.categoryIcon}</div>
                          
                          <div className="absolute top-2 right-2 flex gap-1">
                            {course.certification && (
                              <Badge className="bg-yellow-100 text-yellow-800 text-xs">Certificate</Badge>
                            )}
                            {course.quickROI && (
                              <Badge className="bg-green-100 text-green-800 text-xs">Quick ROI</Badge>
                            )}
                          </div>

                          {/* Hover Actions */}
                          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                            <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" onClick={() => handlePreview(course)}>
                              <Play className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
                            <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" onClick={() => handleAddToPath(course)}>
                              <Plus className="w-4 h-4 mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
                          <p className="text-sm text-primary mb-2">{course.shortValueProp}</p>

                          {/* Personalization Reason */}
                          <div className="mb-3 p-2 bg-accent/10 rounded-md">
                            <p className="text-xs text-accent-foreground">
                              ✨ {getTrainingRecommendation(currentUser, course)}
                            </p>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            <Badge className={cn("text-xs", getLevelColor(course.level))}>
                              {course.level}
                            </Badge>
                            <Badge variant="outline" className="text-xs">{course.format}</Badge>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="text-center p-2 bg-secondary/50 rounded-md">
                              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-primary">
                                <Clock className="w-3 h-3" />
                                {course.duration}
                              </div>
                              <div className="text-xs text-muted-foreground">Duration</div>
                            </div>
                            <div className="text-center p-2 bg-secondary/50 rounded-md">
                              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-primary">
                                <Star className="w-3 h-3" />
                                {course.rating}
                              </div>
                              <div className="text-xs text-muted-foreground">Rating</div>
                            </div>
                          </div>

                          {/* Bottom */}
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-primary">{course.price}</span>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" className="p-1 h-6 w-6">
                                <Heart className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="p-1 h-6 w-6">
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Learning Path CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Build Your AI Skills?</h2>
          <p className="text-muted-foreground mb-6">
            Create a personalized learning path based on your goals and schedule
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Target className="w-5 h-5 mr-2" />
            Create My Learning Path
          </Button>
        </div>
      </div>

      {/* Course Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCourse && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{selectedCourse.categoryIcon}</div>
                    <div>
                      <DialogTitle className="text-2xl mb-2">{selectedCourse.title}</DialogTitle>
                      <div className="flex gap-2">
                        <Badge className={cn("text-xs", getLevelColor(selectedCourse.level))}>
                          {selectedCourse.level}
                        </Badge>
                        <Badge variant="outline" className="text-xs">{selectedCourse.format}</Badge>
                        <Badge variant="outline" className="text-xs">{selectedCourse.duration}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{selectedCourse.price}</div>
                    <div className="text-sm text-muted-foreground">{selectedCourse.enrollments} enrolled</div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Course Overview */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Course Overview</h3>
                  <p className="text-muted-foreground">{selectedCourse.description}</p>
                </div>

                {/* Target Audience */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Who Should Take This</h3>
                  <p className="text-muted-foreground">{selectedCourse.targetAudience}</p>
                </div>

                {/* Learning Outcomes */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {selectedCourse.outcomes.map((outcome, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Modules */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Course Modules</h3>
                  <div className="space-y-2">
                    {selectedCourse.modules.map((module, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t">
                  <Button 
                    size="lg" 
                    onClick={() => handleEnroll(selectedCourse)}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Enroll Now
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => handleAddToPath(selectedCourse)}
                    className="flex-1"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add to Learning Path
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}