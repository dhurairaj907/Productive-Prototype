import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowRight, TrendingUp, User, Briefcase, GraduationCap, Laptop } from "lucide-react";
import { motion } from "framer-motion";

export default function Onboarding() {
  const [, setLocation] = useLocation();

  const handleSelectRole = () => {
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-primary/20">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-heading font-bold">Step 2: Your Profile</h1>
          <p className="text-muted-foreground">Select the category that best describes your situation.</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {roles.map((role) => (
            <Button 
              key={role.label} 
              variant="outline" 
              className="h-16 justify-start gap-4 px-6 text-lg border-muted-foreground/20 hover:border-primary hover:bg-primary/5 transition-all"
              onClick={handleSelectRole}
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                {role.icon}
              </div>
              {role.label}
              <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100" />
            </Button>
          ))}
        </div>
        
        <p className="text-xs text-center text-muted-foreground">
          This helps us tailor our financial advice and budgeting rules for you.
        </p>
      </motion.div>
    </div>
  );
}
