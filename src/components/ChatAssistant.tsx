"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles, PhoneCall, ShieldCheck, Briefcase } from "lucide-react";
import { useModuleContext } from "@/context/module-context";

interface Message {
  role: "assistant" | "user";
  content: string;
}

export function ChatAssistant() {
  const { settings } = useModuleContext();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Detect if we are in internal context (Dashboard or Login)
  const isInternal = pathname.startsWith("/dashboard") || pathname.startsWith("/login");
  const assistantTitle = isInternal ? "Asistente Operativo" : "Asistente Podocarpus";
  const themeColor = isInternal ? "bg-andina-accent" : "bg-andina-primary";
  const borderColor = isInternal ? "border-andina-accent/30" : "border-andina-primary/30";

  // Initialize with welcome message from settings
  useEffect(() => {
    if (messages.length === 0 && settings.welcomeMessage) {
      setMessages([{ role: "assistant", content: isInternal 
        ? "Hola. Soy tu Asistente Operativo. Puedo ayudarte con la gestión, reportes o enviar notificaciones de WhatsApp. ¿Qué necesitas?" 
        : settings.welcomeMessage 
      }]);
    }
  }, [settings.welcomeMessage, messages.length, isInternal]);

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
          settings: settings,
          context: isInternal ? "internal" : "public"
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] max-h-[75vh] sm:max-h-[80vh] bg-andina-bg border border-andina-border rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className={`p-6 bg-gradient-to-r ${isInternal ? 'from-andina-accent/20 to-andina-accent/5' : 'from-andina-primary/20 to-andina-accent/10'} border-b border-andina-border flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                <div className="relative">
                    <div className={`w-12 h-12 ${themeColor} rounded-2xl flex items-center justify-center text-white shadow-lg ${isInternal ? 'shadow-andina-accent/30' : 'shadow-andina-primary/30'}`}>
                        {isInternal ? <ShieldCheck size={28} /> : <Bot size={28} />}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-andina-bg rounded-full" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{assistantTitle}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-andina-text/40 uppercase tracking-widest">
                        {isInternal ? 'Modo Administrativo' : 'IA Activa • Online'}
                    </span>
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
                      ${msg.role === "user" ? "bg-andina-accent/20 text-andina-accent" : (isInternal ? "bg-andina-accent/20 text-andina-accent" : "bg-andina-primary/20 text-andina-primary")}`}>
                      {msg.role === "user" ? <User size={16} /> : (isInternal ? <Briefcase size={16} /> : <Sparkles size={16} />)}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line
                      ${msg.role === "user" 
                        ? `${themeColor} text-white rounded-tr-none shadow-lg shadow-andina-primary/10` 
                        : "bg-andina-surface/60 border border-andina-border text-andina-text/90 rounded-tl-none"}`}>
                      {msg.content.split(/(\*\*.*?\*\*)/g).map((part, index) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return <strong key={index} className={`font-bold ${isInternal ? 'text-andina-accent' : 'text-white'}`}>{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] flex gap-3">
                    <div className={`w-8 h-8 rounded-lg ${isInternal ? 'bg-andina-accent/20 text-andina-accent' : 'bg-andina-primary/20 text-andina-primary'} flex items-center justify-center`}>
                        <Sparkles size={16} className="animate-spin" />
                    </div>
                    <div className="p-4 rounded-2xl bg-andina-surface/40 border border-andina-border flex gap-1 items-center">
                        <span className={`w-1.5 h-1.5 rounded-full ${isInternal ? 'bg-andina-accent' : 'bg-andina-primary'} animate-bounce`} style={{ animationDelay: '0ms' }} />
                        <span className={`w-1.5 h-1.5 rounded-full ${isInternal ? 'bg-andina-accent' : 'bg-andina-primary'} animate-bounce`} style={{ animationDelay: '150ms' }} />
                        <span className={`w-1.5 h-1.5 rounded-full ${isInternal ? 'bg-andina-accent' : 'bg-andina-primary'} animate-bounce`} style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 pt-2 border-t border-andina-border bg-andina-surface/20">
              <div className="flex items-center gap-2 mb-3">
                <p className={`text-[10px] font-mono ${isInternal ? 'text-andina-accent/60' : 'text-andina-text/30'} uppercase tracking-[0.2em] flex items-center gap-2`}>
                  {isInternal ? <ShieldCheck size={10} /> : <PhoneCall size={10} />}
                  {isInternal ? 'Privilegios de Gerencia Habilitados' : 'Captación de Leads Activa'}
                </p>
              </div>

              <div className="flex gap-2 items-end bg-andina-bg/50 border border-andina-border p-2 rounded-2xl focus-within:border-andina-accent/50 transition-all shadow-inner">
                <textarea
                  placeholder={isInternal ? "Escribe una orden o cotización..." : "Escribe tu consulta..."}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-3 resize-none max-h-32 min-h-[40px] text-andina-text placeholder:text-andina-text/20"
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                  }}
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className={`p-3 rounded-xl transition-all ${
                    isInternal 
                    ? 'bg-andina-accent hover:opacity-90' 
                    : 'bg-andina-primary hover:opacity-90'
                  } text-white disabled:opacity-50 shadow-lg`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-andina-text/20 mt-3 text-center">
                <b>Enter</b> para enviar · <b>Shift + Enter</b> salto de línea
              </p>
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
          ${isOpen ? "bg-andina-surface border border-andina-border text-white" : `${themeColor} text-white`}`}
      >
        {isOpen ? <X size={28} /> : (
            <div className="relative">
                {isInternal ? <ShieldCheck size={28} /> : <MessageSquare size={28} />}
                {!isInternal && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-andina-accent text-[10px] font-black flex items-center justify-center rounded-full border-2 border-andina-primary animate-bounce">
                      1
                  </span>
                )}
            </div>
        )}
      </motion.button>
    </div>
  );
}
