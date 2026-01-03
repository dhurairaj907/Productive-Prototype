import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Wallet, 
  PiggyBank, 
  TrendingUp, 
  AlertTriangle, 
  UserCircle,
  Settings, 
  Menu,
  UploadCloud
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide sidebar/nav on login and onboarding
  const hideLayout = ["/", "/onboarding", "/upload"].includes(location);

  if (hideLayout) {
    return <main className="min-h-screen bg-background">{children}</main>;
  }

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/tracking", icon: Wallet, label: "Daily Tracking" },
    { href: "/savings", icon: PiggyBank, label: "Savings" },
    { href: "/alerts", icon: AlertTriangle, label: "Alerts" },
    { href: "/investments", icon: TrendingUp, label: "Investment" },
    { href: "/profile", icon: UserCircle, label: "Profile" },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 font-heading font-bold text-xl text-primary">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            I
          </div>
          Invox
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors cursor-pointer ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <Link href="/settings">
          <div
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors cursor-pointer ${
              location === "/settings"
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r border-border bg-card fixed inset-y-0 z-50">
        <NavContent />
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md px-4 h-16 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2 font-heading font-bold text-lg text-primary">
             <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs">
              I
            </div>
            Invox
          </div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 border-r border-border">
              <NavContent />
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full animate-in fade-in duration-500">
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card pb-safe px-4 py-2 flex justify-around items-center z-50">
          {navItems.slice(0, 5).map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}>
                  <item.icon className={`w-5 h-5 ${isActive ? "fill-current" : ""}`} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
