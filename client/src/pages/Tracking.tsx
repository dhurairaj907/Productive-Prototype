import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Calendar } from "lucide-react";

export default function Tracking() {
  const expenses = [
    { id: 1, name: "Grocery Store", category: "Food", date: "Today, 10:23 AM", amount: -85.20 },
    { id: 2, name: "Shell Station", category: "Transport", date: "Today, 08:15 AM", amount: -45.00 },
    { id: 3, name: "Starbucks", category: "Food", date: "Yesterday, 3:45 PM", amount: -6.50 },
    { id: 4, name: "Electric Bill", category: "Utilities", date: "Jun 29, 2024", amount: -124.30 },
    { id: 5, name: "Amazon", category: "Shopping", date: "Jun 28, 2024", amount: -34.99 },
    { id: 6, name: "Uber", category: "Transport", date: "Jun 27, 2024", amount: -18.20 },
    { id: 7, name: "Netflix", category: "Entertainment", date: "Jun 25, 2024", amount: -15.99 },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Daily Expenses</h1>
          <p className="text-muted-foreground">Review and categorize your transactions.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2">
             <Calendar className="w-4 h-4" />
             Select Date
           </Button>
           <Button className="gap-2">
             <Plus className="w-4 h-4" />
             Add Manual
           </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search transactions..." className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
             <div className="flex items-center gap-2">
               <Filter className="w-4 h-4 text-muted-foreground" />
               <SelectValue placeholder="All Categories" />
             </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="transport">Transport</SelectItem>
            <SelectItem value="shopping">Shopping</SelectItem>
            <SelectItem value="utilities">Utilities</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider">Today</h3>
        {expenses.slice(0, 2).map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
        
        <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider pt-4">Yesterday</h3>
        {expenses.slice(2, 3).map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
        
        <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider pt-4">Earlier</h3>
        {expenses.slice(3).map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
}

function ExpenseItem({ expense }: { expense: any }) {
  return (
    <Card className="hover:bg-muted/30 transition-colors border-border/50 shadow-none">
      <CardContent className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg shrink-0">
            {expense.category === "Food" && "🍔"}
            {expense.category === "Transport" && "🚗"}
            {expense.category === "Utilities" && "💡"}
            {expense.category === "Shopping" && "🛍️"}
            {expense.category === "Entertainment" && "🎬"}
          </div>
          <div>
            <p className="font-medium">{expense.name}</p>
            <p className="text-xs text-muted-foreground">{expense.date} • {expense.category}</p>
          </div>
        </div>
        <div className="text-right">
           <span className="font-semibold block">{expense.amount.toFixed(2)}</span>
           <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary">Edit</Button>
        </div>
      </CardContent>
    </Card>
  )
}
