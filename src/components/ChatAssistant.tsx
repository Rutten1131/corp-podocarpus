"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles, PhoneCall } from "lucide-react";
import { useModuleContext } from "@/context/module-context";

interface Message {
  role: "assistant" | "user";
  content: string;
}

export function ChatAssistant() {
  const { settings } = useModuleContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message from settings
  useEffect(() => {
    if (messages.length === 0 && settings.welcomeMessage) {
      setMessages([{ role: "assistant", content: settings.welcomeMessage }]);
    }
  }, [settings.welcomeMessage, messages.length]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  if (!settings.aiEnabled) return null;

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMsg,
          history: messages,
          settings: settings 
        }),
      });

      const data = await response.json();
      
      if (data.response) {
        setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Lo siento, tuve un problema de conexión. ¿Podrías intentar de nuevo?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-[400px] h-[600px] max-h-[80vh] bg-andina-bg border border-andina-border rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-andina-primary/20 to-andina-accent/10 border-b border-andina-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="w-12 h-12 bg-andina-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-andina-primary/30">
                        <Bot size={28} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-andina-bg rounded-full" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Asistente Podocarpus</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-andina-text/40 uppercase tracking-widest">IA Activa • Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-andina-text/40 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none"
            >
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1
                      ${msg.role === "user" ? "bg-andina-accent/20 text-andina-accent" : "bg-andina-primary/20 text-andina-primary"}`}>
                      {msg.role === "user" ? <User size={16} /> : <Sparkles size={16} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                      ${msg.role === "user" 
                        ? "bg-andina-primary text-white rounded-tr-none" 
                        : "bg-andina-surface/60 border border-andina-border text-andina-text/90 rounded-tl-none"}`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-andina-primary/20 text-andina-primary flex items-center justify-center">
                        <Sparkles size={16} className="animate-spin" />
                    </div>
                    <div className="p-4 rounded-2xl bg-andina-surface/40 border border-andina-border flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-andina-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-andina-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-andina-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 pt-2 border-t border-andina-border bg-andina-surface/20">
                <div className="flex items-center gap-2 mb-4">
                    <p className="text-[10px] font-mono text-andina-text/30 uppercase tracking-[0.2em] flex items-center gap-2">
                        <PhoneCall size={10} /> Notificaciones habilitadas
                    </p>
                </div>
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Escribe tu consulta aquí..."
                  className="w-full bg-andina-bg border border-andina-border rounded-2xl py-4 pl-5 pr-14 text-sm focus:border-andina-primary focus:ring-1 focus:ring-andina-primary/20 outline-none transition-all shadow-inner"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-andina-primary text-white rounded-xl hover:bg-andina-primary/90 transition-all disabled:opacity-50 disabled:bg-white/10"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(46,168,79,0.3)] transition-all duration-500
          ${isOpen ? "bg-andina-surface border border-andina-border text-white" : "bg-andina-primary text-white"}`}
      >
        {isOpen ? <X size={28} /> : (
            <div className="relative">
                <MessageSquare size={28} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-andina-accent text-[10px] font-black flex items-center justify-center rounded-full border-2 border-andina-primary animate-bounce">
                    1
                </span>
            </div>
        )}
      </motion.button>
    </div>
  );
}
