import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import { Chatbot } from "@/components/ui/chatbot";
import NotFound from "@/pages/not-found";

import Login from "@/pages/Login";
import Onboarding from "@/pages/Onboarding";
import Dashboard from "@/pages/Dashboard";
import Upload from "@/pages/Upload";
import Tracking from "@/pages/Tracking";
import Savings from "@/pages/Savings";
import Alerts from "@/pages/Alerts";
import Investments from "@/pages/Investments";
import Settings from "@/pages/Settings";
import Profile from "@/pages/Profile";

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/upload" component={Upload} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/tracking" component={Tracking} />
        <Route path="/savings" component={Savings} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/investments" component={Investments} />
        <Route path="/settings" component={Settings} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
      <Chatbot />
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
