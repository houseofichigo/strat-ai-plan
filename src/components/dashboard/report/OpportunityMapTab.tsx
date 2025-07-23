import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function OpportunityMapTab() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-primary mb-2">Opportunity Map</h2>
        <p className="text-muted-foreground text-lg">
          Strategic prioritization matrix based on impact vs effort analysis
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-warning/5 border-warning/20">
          <CardHeader>
            <CardTitle className="text-warning flex items-center gap-2">
              <span className="w-4 h-4 bg-warning rounded-full"></span>
              Fill the Gaps
            </CardTitle>
            <p className="text-sm text-warning/80">Low Impact, Low Effort</p>
            <p className="text-xs text-muted-foreground">Foundation building and maintenance activities</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded">
              <h4 className="font-medium text-sm">Data Governance Framework</h4>
              <div className="flex gap-2 mt-1">
                <span className="text-xs px-2 py-1 bg-muted rounded">Governance</span>
              </div>
            </div>
            <div className="p-3 border rounded">
              <h4 className="font-medium text-sm">AI Ethics Training</h4>
              <div className="flex gap-2 mt-1">
                <span className="text-xs px-2 py-1 bg-muted rounded">Culture</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-destructive/5 border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <span className="w-4 h-4 bg-destructive rounded-full"></span>
              Questionable
            </CardTitle>
            <p className="text-sm text-destructive/80">Low Impact, High Effort</p>
            <p className="text-xs text-muted-foreground">Carefully evaluate these opportunities before proceeding</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded">
              <h4 className="font-medium text-sm">Experimental AI Models</h4>
              <div className="flex gap-2 mt-1">
                <span className="text-xs px-2 py-1 bg-muted rounded">Research</span>
              </div>
            </div>
            <div className="p-3 border rounded">
              <h4 className="font-medium text-sm">Blockchain Integration</h4>
              <div className="flex gap-2 mt-1">
                <span className="text-xs px-2 py-1 bg-muted rounded">Technology</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-success/10 rounded-lg p-4 mb-3">
                <h3 className="font-bold text-success mb-2">Phase 1</h3>
                <p className="text-sm text-success/80">Immediate (0-3 months)</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-success/5 rounded">Automated Reporting</div>
                <div className="p-2 bg-success/5 rounded">Data Quality Monitoring</div>
                <div className="p-2 bg-success/5 rounded">Basic Chatbot</div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-lg p-4 mb-3">
                <h3 className="font-bold text-primary mb-2">Phase 2</h3>
                <p className="text-sm text-primary/80">Foundation (3-9 months)</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-primary/5 rounded">Data Governance Framework</div>
                <div className="p-2 bg-primary/5 rounded">AI Ethics Training</div>
                <div className="p-2 bg-primary/5 rounded">Legacy System Integration</div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-accent/10 rounded-lg p-4 mb-3">
                <h3 className="font-bold text-foreground mb-2">Phase 3</h3>
                <p className="text-sm text-muted-foreground">Transformation (9+ months)</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-accent/5 rounded">Predictive Analytics Platform</div>
                <div className="p-2 bg-accent/5 rounded">AI-Powered Personalization</div>
                <div className="p-2 bg-accent/5 rounded">Intelligent Process Mining</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}