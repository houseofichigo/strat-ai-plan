import React from 'react';
import { FormData } from '@/data/assessmentData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Mail } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface AssessmentResultsProps {
  formData: FormData;
}

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({ formData }) => {
  const handleDownloadReport = () => {
    // Implementation for downloading PDF report
    console.log('Downloading report...', formData);
  };

  const handleEmailReport = () => {
    // Implementation for emailing report
    console.log('Emailing report...', formData);
  };

  const handleGoToDashboard = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Assessment Complete!
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Thank you for completing the AI Maturity Assessment. Your personalized report is ready.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your AI Readiness Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Assessment Highlights</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✅ Business Strategy Assessment Completed</li>
                  <li>✅ Financial Readiness Evaluated</li>
                  <li>✅ Technical Infrastructure Reviewed</li>
                  <li>✅ Team Readiness Assessed</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Next Steps</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>📧 Detailed report sent to your email</li>
                  <li>📊 Custom recommendations included</li>
                  <li>🎯 Priority actions identified</li>
                  <li>📅 Implementation timeline suggested</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleEmailReport} className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Report
          </Button>
          
          <Button variant="outline" onClick={handleDownloadReport} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          
          <Button variant="secondary" onClick={handleGoToDashboard}>
            Return to Dashboard
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Your assessment data is securely stored and will be used to provide personalized recommendations.
            <br />
            Questions? Contact our team for a consultation.
          </p>
        </div>
      </div>
    </div>
  );
};