import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquareText, X, Send, Bot, User, Minimize2 } from "lucide-react";
import { ScrollArea } from "./scroll-area";
import { motion, AnimatePresence } from "framer-motion";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hello! I'm your FinPath AI. How can I help with your finances today?" }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput("");

    setTimeout(() => {
      let response = "I'm analyzing your data...";
      if (userMsg.toLowerCase().includes("spending")) response = "You've spent $3,120 this month. 40% of that went to Housing.";
      else if (userMsg.toLowerCase().includes("save")) response = "You're on track! You've saved $1,450 this month.";
      
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="w-[350px] sm:w-[400px]"
          >
            <Card className="shadow-2xl border-primary/20 overflow-hidden">
              <CardHeader className="bg-primary p-4 flex flex-row items-center justify-between text-primary-foreground">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  <CardTitle className="text-sm font-heading">FinPath AI Support</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-white/10" onClick={() => setIsOpen(false)}>
                  <Minimize2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-4" viewportRef={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`p-3 rounded-2xl text-sm ${
                          msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted rounded-tl-none'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
                  <Input 
                    placeholder="Ask a question..." 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    className="h-10"
                  />
                  <Button type="submit" size="icon" className="h-10 w-10">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button 
        size="icon" 
        className="h-14 w-14 rounded-full shadow-xl shadow-primary/30"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquareText className="w-6 h-6" />}
      </Button>
    </div>
  );
}
