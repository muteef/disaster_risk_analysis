"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  BotMessageSquare, 
  Send, 
  User, 
  Sparkles, 
  ShieldCheck, 
  PhoneCall, 
  Info,
  ExternalLink,
  BookOpen
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  suggestedPrompts?: string[];
  timestamp: string;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `### Welcome to the Karnataka AI Disaster Safety Assistant

I am an academic AI conversational assistant trained on verified disaster management frameworks from the **National Disaster Management Authority (NDMA)**, **Karnataka State Disaster Management Authority (KSDMA)**, and **KSNDMC**.

#### What you can ask me:
1. **District Vulnerability**: *"What is the disaster risk profile of Kodagu or Kalaburagi?"*
2. **Immediate Safety Procedures**: *"What should I do during a flood or lightning storm?"*
3. **Emergency Supplies**: *"What items should I keep in an emergency survival grab-bag?"*
4. **Early Warning Signs**: *"How do I recognize signs of a slope landslide?"*

> **Life Safety Notice**: In any immediate life-threatening emergency, always contact Karnataka Unified Emergency at **112** or the State Emergency Control Room at **1070**.`,
      sources: ["National Disaster Management Authority (NDMA)", "Karnataka State Natural Disaster Monitoring Centre (KSNDMC)"],
      suggestedPrompts: [
        "What should I do during a flood in Karnataka?",
        "How to prepare for landslides in Kodagu?",
        "What emergency kit supplies do I need?",
        "What does the 30-30 rule mean for lightning?"
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isTyping) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });

      if (!response.ok) throw new Error("Assistant response failed");

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        sources: data.sources,
        suggestedPrompts: data.suggestedPrompts,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "I apologize, but I encountered an error retrieving that safety information. Please verify your query or consult the emergency helplines directly.",
        sources: ["System Error Handler"],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>RAG-Powered Disaster Intelligence Assistant</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1.5">
            AI Disaster Safety & Preparedness Companion
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Verified guidance grounded in official Karnataka State & NDMA disaster documentation.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:112"
            className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-bold flex items-center gap-1.5 hover:bg-rose-100 transition"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
            <span>Emergency: 112</span>
          </a>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[650px] overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map(msg => {
            const isUser = msg.role === "user";

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    isUser
                      ? "bg-slate-900 text-white dark:bg-slate-800"
                      : "bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white"
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <BotMessageSquare className="w-5 h-5" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[85%] sm:max-w-[75%] space-y-2 ${isUser ? "items-end" : "items-start"}`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? "bg-indigo-600 text-white rounded-tr-none shadow-sm font-medium"
                        : "bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/70 dark:border-slate-700/60 shadow-sm"
                    }`}
                  >
                    {/* Render Markdown-like content */}
                    <div className="whitespace-pre-line prose prose-sm dark:prose-invert max-w-none">
                      {msg.content}
                    </div>

                    {/* Sources Badge if present */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                        <span className="font-bold uppercase tracking-wider block text-[10px] text-indigo-600 dark:text-indigo-400">
                          Verified Reference Sources:
                        </span>
                        {msg.sources.map((s, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <span>• {s}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-400 px-1 block">
                    {msg.timestamp}
                  </span>

                  {/* Suggested Prompts buttons */}
                  {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                    <div className="pt-2 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-slate-400 font-semibold block w-full mb-1">
                        Suggested Inquiries:
                      </span>
                      {msg.suggestedPrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(prompt)}
                          className="px-2.5 py-1 text-xs rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition text-left"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                <BotMessageSquare className="w-5 h-5 animate-pulse" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
                <span className="ml-2 font-medium">Retrieving verified disaster guidelines...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about flood safety, landslide warnings in Kodagu, emergency kits..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white shadow-md transition"
              aria-label="Send Message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="mt-2 text-center text-[10px] text-slate-400">
            For academic project demonstrations. Educational disaster-awareness advice only; follow official KSDMA directives during events.
          </div>
        </div>
      </div>
    </div>
  );
}
