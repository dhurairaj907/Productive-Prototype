import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import NotFound from "@/pages/not-found";

import Onboarding from "@/pages/Onboarding";
import Dashboard from "@/pages/Dashboard";
import Upload from "@/pages/Upload";
import Tracking from "@/pages/Tracking";
import Savings from "@/pages/Savings";
import Alerts from "@/pages/Alerts";
import Investments from "@/pages/Investments";
import Chat from "@/pages/Chat";
import Settings from "@/pages/Settings";

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Onboarding} />
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/upload" component={Upload} />
        <Route path="/tracking" component={Tracking} />
        <Route path="/savings" component={Savings} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/investments" component={Investments} />
        <Route path="/chat" component={Chat} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
