import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Target, Trophy, Clock } from "lucide-react";

export default function Savings() {
  const goals = [
    {
      name: "Emergency Fund",
      current: 8500,
      target: 15000,
      deadline: "Dec 2024",
      icon: <ShieldHeartIcon className="w-6 h-6 text-red-500" />,
      color: "bg-red-500",
      bg: "bg-red-100 dark:bg-red-900/20"
    },
    {
      name: "New Car",
      current: 12000,
      target: 35000,
      deadline: "Jun 2025",
      icon: <CarIcon className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      name: "Europe Trip",
      current: 2500,
      target: 5000,
      deadline: "Aug 2024",
      icon: <PlaneIcon className="w-6 h-6 text-emerald-500" />,
      color: "bg-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-900/20"
    },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Savings Goals</h1>
          <p className="text-muted-foreground">Track your progress towards financial freedom</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal, i) => {
          const percentage = Math.round((goal.current / goal.target) * 100);
          return (
            <Card key={i} className="glass-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-xl ${goal.bg}`}>
                    {goal.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground">Target</p>
                    <p className="text-lg font-bold">${goal.target.toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl">{goal.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Clock className="w-3 h-3" />
                    Target: {goal.deadline}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">${goal.current.toLocaleString()}</span>
                    <span className="text-muted-foreground">{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>

                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-muted-foreground">Monthly saving needed</span>
                     <span className="font-bold text-primary">$450/mo</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-none">
        <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/80 uppercase tracking-wider text-sm font-semibold">
              <Trophy className="w-4 h-4" />
              Pro Tip
            </div>
            <h3 className="text-2xl font-bold">Automate your savings</h3>
            <p className="text-white/80 max-w-md">
              Setting up automatic transfers can increase your success rate by 80%. 
              Would you like to set up a rule for payday?
            </p>
          </div>
          <Button variant="secondary" size="lg" className="whitespace-nowrap">
            Setup Auto-Save
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Simple icons for this component
function ShieldHeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    </svg>
  );
}

function CarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M5 17h2" />
      <path d="M15 17h2" />
    </svg>
  )
}

function PlaneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12h20" />
      <path d="M13 2v20" />
      <path d="m10 7 3-5 5 2-8 8" />
      <path d="m14 17 3 5-5-2-3-3" />
    </svg>
  )
}
