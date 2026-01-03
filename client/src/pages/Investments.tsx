import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TrendingUp, Info, PieChart, ShieldCheck } from "lucide-react";

export default function Investments() {
  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Investment Suggestions</h1>
        <p className="text-muted-foreground">Personalized recommendations based on your risk profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="md:col-span-2">
           <CardHeader>
             <CardTitle>Your Risk Profile</CardTitle>
             <CardDescription>Based on your age, income, and goals</CardDescription>
           </CardHeader>
           <CardContent>
             <div className="flex flex-col gap-6">
               <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border border-border">
                 <div className="p-3 bg-primary/10 rounded-full text-primary">
                   <ShieldCheck className="w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="font-bold text-lg">Moderate Growth</h3>
                   <p className="text-sm text-muted-foreground">Balanced approach between stability and growth.</p>
                 </div>
                 <Button variant="outline" size="sm" className="ml-auto">Retake Quiz</Button>
               </div>
               
               <div className="space-y-4">
                 <h4 className="font-medium text-sm">Recommended Allocation</h4>
                 <div className="flex gap-1 h-8 w-full rounded-md overflow-hidden">
                    <div className="bg-blue-600 w-[50%] flex items-center justify-center text-[10px] text-white font-bold">50% Stocks</div>
                    <div className="bg-emerald-500 w-[30%] flex items-center justify-center text-[10px] text-white font-bold">30% Bonds</div>
                    <div className="bg-amber-400 w-[10%] flex items-center justify-center text-[10px] text-white font-bold">10% Crypto</div>
                    <div className="bg-slate-300 w-[10%] flex items-center justify-center text-[10px] text-slate-700 font-bold">10% Cash</div>
                 </div>
               </div>
             </div>
           </CardContent>
         </Card>

         <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-none">
           <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
            <div>
               <h3 className="text-xl font-bold mb-2">Start Investing</h3>
               <p className="text-white/80 text-sm">
                 You have ₹2,11,950 in surplus this month. We recommend investing ₹1,00,000.
               </p>
             </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-white/60">Projected Value (10y)</p>
                      <p className="text-3xl font-bold">₹4,25,000</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-emerald-300" />
                 </div>
                 <Button variant="secondary" className="w-full text-indigo-700 font-bold">
                   View Options
                 </Button>
              </div>
           </CardContent>
         </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-heading font-semibold">Recommended Funds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Nifty 50 Index", type: "ETF", risk: "Moderate", return: "12.5%" },
            { name: "SGB Gold Bond", type: "Bond", risk: "Low", return: "8.2%" },
            { name: "HDFC Tech Fund", type: "Mutual Fund", risk: "High", return: "18.8%" },
          ].map((fund, i) => (
            <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer group">
               <CardContent className="p-4 space-y-3">
                 <div className="flex justify-between items-start">
                   <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center font-bold text-xs text-muted-foreground">
                     {fund.type.substring(0,3)}
                   </div>
                   <Badge variant={fund.risk === "High" ? "destructive" : fund.risk === "Moderate" ? "default" : "secondary"}>
                     {fund.risk}
                   </Badge>
                 </div>
                 <div>
                   <h3 className="font-bold group-hover:text-primary transition-colors">{fund.name}</h3>
                   <p className="text-xs text-muted-foreground">{fund.type}</p>
                 </div>
                 <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                   <TrendingUp className="w-3 h-3" />
                   {fund.return} 5yr avg
                 </div>
               </CardContent>
             </Card>
           ))}
        </div>
      </div>
      
      <div className="p-4 rounded-lg bg-muted text-muted-foreground text-xs text-center">
         <Info className="w-3 h-3 inline mr-1 mb-0.5" />
         Disclaimer: This is advisory only. No investments are executed directly through this prototype.
      </div>
    </div>
  );
}
