import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, AlertCircle, Calendar, Plus } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Transaction } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { toast } = useToast();
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const createTransactionMutation = useMutation({
    mutationFn: async (newTx: any) => {
      const res = await apiRequest("POST", "/api/transactions", newTx);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      toast({
        title: "Success",
        description: "Transaction added successfully",
      });
    },
  });

  const handleAddTx = () => {
    createTransactionMutation.mutate({
      name: "New Transaction",
      amount: "100.00",
      category: "General",
      type: "expense",
      icon: "💰"
    });
  };

  const spendingData = [
    { name: 'Week 1', amount: 450 },
    { name: 'Week 2', amount: 320 },
    { name: 'Week 3', amount: 550 },
    { name: 'Week 4', amount: 280 },
  ];

  const categoryData = [
    { name: 'Housing', value: 1200, color: 'var(--chart-1)' },
    { name: 'Food', value: 450, color: 'var(--chart-2)' },
    { name: 'Transport', value: 200, color: 'var(--chart-3)' },
    { name: 'Shopping', value: 300, color: 'var(--chart-4)' },
    { name: 'Utilities', value: 150, color: 'var(--chart-5)' },
  ];

  const trendData = [
    { month: 'Jan', income: 4000, expense: 2400 },
    { month: 'Feb', income: 4200, expense: 2800 },
    { month: 'Mar', income: 4100, expense: 2300 },
    { month: 'Apr', income: 4500, expense: 3200 },
    { month: 'May', income: 4800, expense: 2900 },
    { month: 'Jun', income: 5000, expense: 3100 },
  ];

  const totalIncome = transactions?.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0) || 5240;
  const totalExpense = transactions?.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0) || 3120.50;

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Welcome back, Alex</h1>
          <p className="text-muted-foreground">Here's your financial overview for June 2024</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </Button>
          <Button 
            className="gap-2 shadow-lg shadow-primary/20" 
            onClick={() => {
              const name = window.prompt("Transaction Name", "Grocery Store");
              const amount = window.prompt("Amount", "100.00");
              const type = window.confirm("Is this Income? (Cancel for Expense)") ? "income" : "expense";
              if (name && amount) {
                createTransactionMutation.mutate({
                  name,
                  amount,
                  category: "General",
                  type,
                  icon: type === "income" ? "💰" : "🛒"
                });
              }
            }}
            disabled={createTransactionMutation.isPending}
            data-testid="button-add-transaction"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Total Income</p>
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-heading">₹5,24,000</h3>
              <p className="text-xs text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Total Spending</p>
              <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600">
                <ArrowDownRight className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-heading">₹3,12,050</h3>
              <p className="text-xs text-rose-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +5% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-md transition-shadow bg-primary text-primary-foreground border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-primary-foreground/80">Savings Capacity</p>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-heading">₹2,11,950</h3>
              <p className="text-xs text-primary-foreground/80">
                40% of income saved
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Spending Trends</CardTitle>
            <CardDescription>Income vs Expenses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Line type="monotone" dataKey="income" stroke="hsl(var(--primary))" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="expense" stroke="hsl(var(--destructive))" strokeWidth={3} dot={{r: 4}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Where your money went this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                     itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {categoryData.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-medium">₹{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-lg">Recent Transactions</h3>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          <div className="space-y-3">
            {isLoading ? (
              Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)
            ) : (
              transactions?.map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                      {tx.icon}
                    </div>
                    <div>
                      <p className="font-medium">{tx.name}</p>
                      <p className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`font-semibold ${tx.type === 'income' ? 'text-emerald-600' : 'text-foreground'}`}>
                    {tx.type === 'income' ? '+' : ''}₹{Number(tx.amount).toFixed(2)}
                  </span>
                </div>
              ))
            )}
            {!isLoading && transactions?.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No transactions yet. Add your first one!</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-lg">Alerts</h3>
          <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30">
            <CardContent className="p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900 dark:text-amber-100 text-sm">Overspending Warning</p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  You've exceeded your Food budget by 15% this month.
                </p>
              </div>
            </CardContent>
          </Card>
           <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/30">
            <CardContent className="p-4 flex gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100 text-sm">Saving Goal Reached</p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  Congrats! You hit your Emergency Fund goal.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
