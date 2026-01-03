import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Shield, PieChart, TrendingUp, Wallet, Plus, Trash2, Landmark } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePie, Pie, Cell
} from "recharts";

interface AccountUpload {
  id: string;
  bankName: string;
  accountType: string;
  file: File | null;
}

const mockAnalysisData = [
  { name: 'Income', value: 4500, color: 'var(--chart-1)' },
  { name: 'Fixed', value: 2100, color: 'var(--chart-2)' },
  { name: 'Variable', value: 950, color: 'var(--chart-3)' },
  { name: 'Savings', value: 1450, color: 'var(--chart-4)' },
];

export default function UploadPage() {
  const [accounts, setAccounts] = useState<AccountUpload[]>([
    { id: '1', bankName: '', accountType: '', file: null }
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const addAccount = () => {
    setAccounts([...accounts, { id: Math.random().toString(), bankName: '', accountType: '', file: null }]);
  };

  const removeAccount = (id: string) => {
    if (accounts.length > 1) {
      setAccounts(accounts.filter(a => a.id !== id));
    }
  };

  const updateAccount = (id: string, updates: Partial<AccountUpload>) => {
    setAccounts(accounts.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const handleUpload = () => {
    const isValid = accounts.every(a => a.bankName && a.accountType && a.file);
    if (!isValid) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all bank details and upload CSV files for each account.",
      });
      return;
    }

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
            description: `Successfully analyzed ${accounts.length} accounts.`,
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
          <p className="text-muted-foreground">Combined analysis for {accounts.length} accounts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Combined Spending</CardTitle>
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
            <h3 className="font-heading font-semibold">Consolidated Findings</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-card border flex justify-between items-center">
                <span className="text-muted-foreground">Total Balance</span>
                <span className="font-bold font-heading text-lg">₹14,250.00</span>
              </div>
              <div className="p-4 rounded-xl bg-card border flex justify-between items-center">
                <span className="text-muted-foreground">Accounts Linked</span>
                <span className="text-primary font-bold">{accounts.length} Banks</span>
              </div>
              <div className="p-4 rounded-xl bg-card border flex justify-between items-center">
                <span className="text-muted-foreground">Recurring Bills</span>
                <span className="text-rose-600 font-bold">15 detected</span>
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
    <div className="max-w-3xl mx-auto space-y-8 py-8 pb-24 px-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-heading font-bold">Step 3: Connect Accounts</h1>
        <p className="text-muted-foreground">Provide bank details and upload statements for multiple accounts.</p>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {accounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative"
            >
              <Card className="border-border/50 overflow-hidden">
                <div className="absolute top-4 right-4 z-10">
                  {accounts.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => removeAccount(account.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <CardTitle className="text-base">Account #{index + 1}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Bank Name</Label>
                      <Select 
                        value={account.bankName} 
                        onValueChange={(val) => updateAccount(account.id, { bankName: val })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hdfc">HDFC Bank</SelectItem>
                          <SelectItem value="sbi">State Bank of India (SBI)</SelectItem>
                          <SelectItem value="icici">ICICI Bank</SelectItem>
                          <SelectItem value="axis">Axis Bank</SelectItem>
                          <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                          <SelectItem value="pnb">Punjab National Bank (PNB)</SelectItem>
                          <SelectItem value="bob">Bank of Baroda</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Account Type</Label>
                      <Select 
                        value={account.accountType} 
                        onValueChange={(val) => updateAccount(account.id, { accountType: val })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Account Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="savings">Savings Account</SelectItem>
                          <SelectItem value="checking">Checking Account</SelectItem>
                          <SelectItem value="credit">Credit Card</SelectItem>
                          <SelectItem value="investment">Investment Account</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Statement (CSV)</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/40 transition-colors relative">
                      <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground">
                        {account.file ? account.file.name : "Drop your bank statement here"}
                      </p>
                      <input 
                        type="file" 
                        accept=".csv"
                        className="absolute inset-0 opacity-0 cursor-pointer z-20"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          updateAccount(account.id, { file });
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        <Button 
          variant="outline" 
          className="w-full border-dashed h-12 gap-2"
          onClick={addAccount}
        >
          <Plus className="w-4 h-4" />
          Add Another Account
        </Button>
      </div>

      <div className="pt-4">
        {isUploading ? (
          <div className="space-y-4 text-center">
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm font-medium animate-pulse text-primary">
              Analyzing transactions across {accounts.length} accounts...
            </p>
          </div>
        ) : (
          <Button className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20" onClick={handleUpload}>
            Analyze All Accounts
          </Button>
        )}
      </div>

      <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 text-blue-800 dark:text-blue-300">
        <Shield className="w-5 h-5 shrink-0" />
        <p className="text-xs">
          <strong>Security:</strong> FinPath uses multi-account aggregation to build your financial twin. Your data remains encrypted.
        </p>
      </div>
    </div>
  );
}
