import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hello! I'm your FinPath assistant. I can help you understand your spending, set goals, or explain financial concepts. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', content: input }]);
    const userInput = input;
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      let response = "I can help with that. Could you provide more details?";
      if (userInput.toLowerCase().includes("spending") || userInput.toLowerCase().includes("spend")) {
        response = "Based on your recent data, you've spent $3,120.50 this month. Your highest category is Housing ($1,200). Would you like a breakdown of other categories?";
      } else if (userInput.toLowerCase().includes("save") || userInput.toLowerCase().includes("saving")) {
        response = "You're currently saving about 40% of your income, which is excellent! We recommend keeping at least 20% aside. You are on track for your Emergency Fund goal.";
      } else if (userInput.toLowerCase().includes("invest")) {
        response = "Based on your Moderate risk profile, we suggest looking into diversified index funds. Would you like to see our investment suggestions page?";
      }
      
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-foreground">AI Support</h1>
        <p className="text-muted-foreground">Ask questions about your finances</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-border/50 shadow-lg">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                    : 'bg-muted rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 bg-card border-t border-border">
          <form 
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <Input 
              placeholder="Ask about your spending, budget, or savings..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-background"
            />
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {["Why did I get an alert?", "How much did I save?", "Investment advice", "Cancel subscription"].map((suggestion) => (
          <Button 
            key={suggestion} 
            variant="outline" 
            size="sm" 
            className="whitespace-nowrap rounded-full text-xs"
            onClick={() => {
              setInput(suggestion);
            }}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}
