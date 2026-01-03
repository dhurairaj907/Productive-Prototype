import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Calendar, MessageSquare, PhoneIncoming } from "lucide-react";
import { motion } from "framer-motion";

export default function Tracking() {
  const expenses = [
    { id: 1, name: "Grocery Store", category: "Food", date: "Today, 10:23 AM", amount: -1250.20, source: "Manual" },
    { id: 2, name: "Apple Pay - Starbucks", category: "Food", date: "Today, 08:15 AM", amount: -450.50, source: "SMS" },
    { id: 3, name: "Gas Station", category: "Transport", date: "Yesterday, 3:45 PM", amount: -2100.00, source: "SMS" },
    { id: 4, name: "Netflix Subscription", category: "Entertainment", date: "Jun 29, 2024", amount: -899.00, source: "SMS" },
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Daily Tracking</h1>
          <p className="text-muted-foreground">Transactions synced from your bank and SMS.</p>
        </div>
        <div className="flex gap-2">
           <Button className="gap-2 shadow-lg shadow-primary/20">
             <Plus className="w-4 h-4" />
             Add Transaction
           </Button>
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">SMS Tracking Active</p>
              <p className="text-xs text-muted-foreground">Monitoring your bank transaction alerts</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Manage SMS</Button>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search transactions..." className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
             <div className="flex items-center gap-2">
               <Filter className="w-4 h-4 text-muted-foreground" />
               <SelectValue placeholder="Filter Source" />
             </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="sms">SMS Sync</SelectItem>
            <SelectItem value="manual">Manual Entry</SelectItem>
            <SelectItem value="bank">Direct Bank</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {expenses.map((expense) => (
          <motion.div key={expense.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="hover:bg-muted/30 transition-colors border-border/50 shadow-none">
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg shrink-0">
                    {expense.category === "Food" && "🍔"}
                    {expense.category === "Transport" && "🚗"}
                    {expense.category === "Entertainment" && "🎬"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{expense.name}</p>
                      {expense.source === "SMS" && (
                        <span className="flex items-center gap-1 text-[10px] font-bold bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded uppercase">
                          <MessageSquare className="w-2 h-2" /> SMS
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{expense.date} • {expense.category}</p>
                  </div>
                </div>
                <div className="text-right">
                   <span className="font-semibold block">₹{Math.abs(expense.amount).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
