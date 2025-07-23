import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';

export function PillarsTab() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-primary mb-2">Detailed Pillar Analysis</h2>
        <p className="text-muted-foreground text-lg">
          In-depth assessment across all dimensions of AI and data readiness
        </p>
      </div>

      {/* Data Foundation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Data Foundation</CardTitle>
            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">4 Dimensions</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <h3 className="font-semibold">Data Quality</h3>
                <p className="text-sm text-muted-foreground">Strong data validation processes, some gaps in completeness</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-primary">3.8/5.0</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-warning" />
              <div>
                <h3 className="font-semibold">Data Architecture</h3>
                <p className="text-sm text-muted-foreground">Modern cloud infrastructure, needs better integration</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-warning">3.2/5.0</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <h3 className="font-semibold">Data Governance</h3>
                <p className="text-sm text-muted-foreground">Clear policies established, enforcement could be improved</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-primary">3.5/5.0</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-warning" />
              <div>
                <h3 className="font-semibold">Data Accessibility</h3>
                <p className="text-sm text-muted-foreground">Self-service capabilities limited, training needed</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-warning">2.9/5.0</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="bg-success/5 border-success/20">
          <CardContent className="text-center p-6">
            <div className="text-4xl font-bold text-success mb-2">2</div>
            <p className="text-success font-medium">Strong Areas</p>
          </CardContent>
        </Card>
        
        <Card className="bg-warning/5 border-warning/20">
          <CardContent className="text-center p-6">
            <div className="text-4xl font-bold text-warning mb-2">2</div>
            <p className="text-warning font-medium">Developing</p>
          </CardContent>
        </Card>
        
        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="text-center p-6">
            <div className="text-4xl font-bold text-destructive mb-2">0</div>
            <p className="text-destructive font-medium">Need Focus</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}