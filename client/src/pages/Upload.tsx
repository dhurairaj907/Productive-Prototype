import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Upload, FileText, CheckCircle2, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleUpload = () => {
    setIsUploading(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 5;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        toast({
          title: "Upload Complete",
          description: "Your bank statements have been processed successfully.",
        });
      }
    }, 100);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-heading font-bold">Import Data</h1>
        <p className="text-muted-foreground">Securely upload your bank statements to analyze your finances.</p>
      </div>

      <Card className="border-dashed border-2 border-border bg-muted/20">
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
            <Upload className="w-8 h-8" />
          </div>
          <div className="text-center space-y-1">
            <h3 className="font-semibold text-lg">Click to upload or drag and drop</h3>
            <p className="text-sm text-muted-foreground">CSV or PDF (Max 10MB)</p>
          </div>
          
          {isUploading ? (
            <div className="w-full max-w-xs space-y-2">
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">Processing... {progress}%</p>
            </div>
          ) : (
            <Button onClick={handleUpload} className="mt-4">
              Select Files
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Instructions</h3>
        <Card>
          <CardContent className="p-4 flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0 mt-1">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium">Supported Banks</p>
              <p className="text-sm text-muted-foreground mt-1">
                We support CSV exports from Chase, Wells Fargo, Bank of America, and Citibank. Ensure your file covers at least the last 2 months.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 text-green-800 dark:text-green-300">
          <Shield className="w-5 h-5 shrink-0" />
          <p className="text-xs sm:text-sm">
            <strong>Privacy Note:</strong> We do not store your bank login credentials. Files are processed locally and encrypted.
          </p>
        </div>
      </div>
    </div>
  );
}
