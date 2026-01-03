import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bell, Shield, Wallet, User, LogOut, ChevronRight } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your preferences and account</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile & Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-2">
              <div>
                <p className="font-medium">User Profile</p>
                <p className="text-sm text-muted-foreground">Freelancer</p>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
            <div className="flex items-center justify-between p-2 border-t border-border/50">
              <div>
                <p className="font-medium">Email Address</p>
                <p className="text-sm text-muted-foreground">alex@example.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-medium">SMS Tracking</p>
                <p className="text-sm text-muted-foreground">Analyze bank SMS for transactions (Android)</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-medium">Overspending Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when you exceed budget</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-medium">Weekly Report</p>
                <p className="text-sm text-muted-foreground">Email summary of your finances</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "Manage Linked Accounts",
              "Privacy Policy",
              "Delete Uploaded Data",
              "Export Data"
            ].map((item, i) => (
              <Button key={i} variant="ghost" className="w-full justify-between font-normal h-12">
                {item}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Button>
            ))}
          </CardContent>
        </Card>
        
        <div className="flex justify-center pt-4">
          <Button variant="destructive" className="w-full sm:w-auto gap-2">
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
