import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowRight, ShieldCheck, PieChart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Onboarding() {
  const [, setLocation] = useLocation();

  const handleStart = () => {
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-primary/20 mb-6">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-foreground tracking-tight">
            Master Your Money
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            FinPath helps you track expenses, save for goals, and invest wisely with AI-driven insights.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Card className="border-none shadow-none bg-secondary/50">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <PieChart className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">Smart Analytics</p>
                <p className="text-muted-foreground">Visualize your spending patterns</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-none bg-secondary/50">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">Bank-Grade Security</p>
                <p className="text-muted-foreground">Your data is encrypted & safe</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">I am a...</label>
            <div className="grid grid-cols-2 gap-3">
              {['Student', 'Freelancer', 'Employee', 'Business'].map((type) => (
                <Button 
                  key={type} 
                  variant="outline" 
                  className="h-12 border-muted-foreground/20 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/20 mt-4"
            onClick={handleStart}
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service & Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
