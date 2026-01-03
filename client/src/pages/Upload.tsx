import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Shield, PieChart, TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePie, Pie, Cell
} from "recharts";

const mockAnalysisData = [
  { name: 'Income', value: 4500, color: 'var(--chart-1)' },
  { name: 'Fixed', value: 2100, color: 'var(--chart-2)' },
  { name: 'Variable', value: 950, color: 'var(--chart-3)' },
  { name: 'Savings', value: 1450, color: 'var(--chart-4)' },
];

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleUpload = () => {
    setIsUploading(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setIsAnalyzed(true);
          toast({
            title: "Analysis Complete",
            description: "We've parsed your CSV and generated a financial summary.",
          });
        }, 500);
      }
    }, 150);
  };

  if (isAnalyzed) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-heading font-bold">Analysis Results</h1>
          <p className="text-muted-foreground">Here is what we found in your statement</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Spending Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RePie>
                  <Pie
                    data={mockAnalysisData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockAnalysisData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePie>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Key Findings</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-card border flex justify-between items-center">
                <span className="text-muted-foreground">Total Analyzed</span>
                <span className="font-bold font-heading text-lg">$7,550.00</span>
              </div>
              <div className="p-4 rounded-xl bg-card border flex justify-between items-center">
                <span className="text-muted-foreground">Income Transactions</span>
                <span className="text-emerald-600 font-bold">12 Items</span>
              </div>
              <div className="p-4 rounded-xl bg-card border flex justify-between items-center">
                <span className="text-muted-foreground">Recurring Bills</span>
                <span className="text-rose-600 font-bold">8 detected</span>
              </div>
            </div>
            <Button className="w-full h-12" onClick={() => setLocation("/dashboard")}>
              Proceed to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-heading font-bold">Step 3: Upload Statement</h1>
        <p className="text-muted-foreground">Upload your CSV bank statement to generate your profile.</p>
      </div>

      <Card className="border-dashed border-2 border-border bg-muted/20">
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
            <Upload className="w-8 h-8" />
          </div>
          <div className="text-center space-y-1">
            <h3 className="font-semibold text-lg">Upload Bank CSV</h3>
            <p className="text-sm text-muted-foreground">We'll automatically categorize your spending</p>
          </div>
          
          {isUploading ? (
            <div className="w-full max-w-xs space-y-2">
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">Analyzing transactions... {progress}%</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-center">
              <Input type="file" accept=".csv" className="max-w-xs cursor-pointer" onChange={handleUpload} />
              <p className="text-xs text-muted-foreground italic">Try uploading any .csv file to see the analysis</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 text-blue-800 dark:text-blue-300">
        <Shield className="w-5 h-5 shrink-0" />
        <p className="text-xs sm:text-sm">
          <strong>Privacy First:</strong> Your financial data is parsed locally in the browser and never leaves your device.
        </p>
      </div>
    </div>
  );
}
