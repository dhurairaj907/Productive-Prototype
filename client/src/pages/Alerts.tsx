import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, TrendingDown, Bell, ArrowRight } from "lucide-react";

export default function Alerts() {
  const alerts = [
    {
      type: "warning",
      title: "Spending Spike Detected",
      description: "You've spent $450 on Dining this week, which is 40% higher than your average.",
      date: "2 hours ago",
      icon: <TrendingUp className="w-5 h-5 text-amber-600" />,
      color: "border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800/30",
      textColor: "text-amber-900 dark:text-amber-100"
    },
    {
      type: "critical",
      title: "Subscription Price Increase",
      description: "Your Netflix subscription charged $15.99 (previously $13.99).",
      date: "Yesterday",
      icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
      color: "border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800/30",
      textColor: "text-red-900 dark:text-red-100"
    },
    {
      type: "info",
      title: "Unusual Merchant",
      description: "First time transaction at 'TechGadget Inc' for $120.00.",
      date: "Jun 28",
      icon: <Bell className="w-5 h-5 text-blue-600" />,
      color: "border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800/30",
      textColor: "text-blue-900 dark:text-blue-100"
    },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Alerts & Insights</h1>
        <p className="text-muted-foreground">Stay on top of your financial health with smart notifications.</p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, i) => (
          <Card key={i} className={`border ${alert.color} shadow-sm`}>
            <CardContent className="p-6 flex items-start gap-4">
              <div className={`p-2 rounded-full bg-white/50 dark:bg-black/20 shrink-0`}>
                {alert.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-semibold ${alert.textColor}`}>{alert.title}</h3>
                  <span className="text-xs text-muted-foreground">{alert.date}</span>
                </div>
                <p className={`text-sm ${alert.textColor} opacity-90`}>{alert.description}</p>
                
                <div className="pt-2 flex gap-2">
                   <Button size="sm" variant="outline" className="h-8 bg-white/50 dark:bg-black/20 border-none hover:bg-white/80">
                    Dismiss
                   </Button>
                   <Button size="sm" variant="ghost" className="h-8 hover:bg-white/30 text-primary">
                    View Details
                    <ArrowRight className="w-3 h-3 ml-1" />
                   </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
             <CardTitle className="text-lg">Category Insights</CardTitle>
             <CardDescription>Where you are overspending vs. peers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <div className="flex justify-between text-sm">
                   <span>Dining Out</span>
                   <span className="text-red-500 font-medium">+25% vs avg</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                   <div className="h-full bg-red-500 w-[75%]" />
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm">
                   <span>Groceries</span>
                   <span className="text-emerald-500 font-medium">-5% vs avg</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-[45%]" />
                </div>
             </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
             <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
               <TrendingDown className="w-6 h-6" />
             </div>
             <div>
               <h3 className="font-bold text-lg">Reduce your bills</h3>
               <p className="text-sm text-muted-foreground mt-1">
                 We found 3 subscriptions you haven't used in 30 days. You could save $45/mo.
               </p>
             </div>
             <Button>Review Subscriptions</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
