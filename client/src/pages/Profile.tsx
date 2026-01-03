import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard, Building, Landmark, Plus, User, Shield } from "lucide-react";

export default function Profile() {
  const accounts = [
    { name: "Main Savings", bank: "Chase", last4: "4242", type: "Savings", balance: 12500 },
    { name: "Primary Checking", bank: "Wells Fargo", last4: "8891", type: "Checking", balance: 2400 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 pb-24">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary border-4 border-background shadow-sm">
          <User className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-3xl font-heading font-bold">Alex Johnson</h1>
          <p className="text-muted-foreground">Premium Member • Freelancer Profile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Linked Bank Accounts</CardTitle>
                <p className="text-sm text-muted-foreground">Manage your connected financial institutions</p>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <Plus className="w-4 h-4" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {accounts.map((acc, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Landmark className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-bold">{acc.name}</p>
                      <p className="text-xs text-muted-foreground">{acc.bank} •••• {acc.last4}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${acc.balance.toLocaleString()}</p>
                    <p className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">Sync Active</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Full Name</Label>
                  <p className="font-medium">Alex Johnson</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <p className="font-medium">alex.j@example.com</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Phone</Label>
                  <p className="font-medium">+1 (555) 000-0000</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Country</Label>
                  <p className="font-medium">United States</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6 space-y-4">
              <Shield className="w-8 h-8 text-white/80" />
              <div>
                <h3 className="font-bold text-lg">Secure & Private</h3>
                <p className="text-xs text-white/70 mt-1">
                  Your data is protected with 256-bit AES encryption. We never share your data with third parties.
                </p>
              </div>
              <Button variant="secondary" className="w-full">Security Audit</Button>
            </CardContent>
          </Card>
          
          <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10">Delete Account</Button>
        </div>
      </div>
    </div>
  );
}
