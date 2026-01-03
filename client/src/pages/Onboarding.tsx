import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { ArrowRight, TrendingUp, User, Briefcase, GraduationCap, Laptop, Landmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");

  const handleSelectRole = (selectedRole: string) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/upload");
  };

  const roles = [
    { label: 'Student', icon: <GraduationCap className="w-5 h-5" /> },
    { label: 'Freelancer', icon: <Laptop className="w-5 h-5" /> },
    { label: 'Employee', icon: <Briefcase className="w-5 h-5" /> },
    { label: 'Business Owner', icon: <User className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md w-full space-y-8"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-primary/20">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-heading font-bold">Step 1: Your Profile</h1>
              <p className="text-muted-foreground">Select the category that best describes your situation.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {roles.map((r) => (
                <Button 
                  key={r.label} 
                  variant="outline" 
                  className="h-16 justify-start gap-4 px-6 text-lg border-muted-foreground/20 hover:border-primary hover:bg-primary/5 transition-all group"
                  onClick={() => handleSelectRole(r.label)}
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                    {r.icon}
                  </div>
                  {r.label}
                  <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100" />
                </Button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md w-full space-y-8"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-primary/20">
                <Landmark className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-heading font-bold">Step 2: Bank Details</h1>
              <p className="text-muted-foreground">Link your primary bank account for better tracking.</p>
            </div>

            <Card className="glass-card">
              <CardContent className="pt-6">
                <form onSubmit={handleComplete} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input id="bankName" placeholder="e.g. HDFC Bank, SBI" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accNumber">Account Number (Last 4 digits)</Label>
                    <Input id="accNumber" placeholder="e.g. 1234" maxLength={4} required />
                  </div>
                  <Button type="submit" className="w-full h-12 text-lg font-semibold mt-2 gap-2">
                    Complete Onboarding
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" type="button" className="w-full" onClick={() => setStep(1)}>
                    Back
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
