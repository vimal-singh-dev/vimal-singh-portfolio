/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { audioManager } from '../services/audioService';

const SUGGESTED_QUERIES = [
  "Summarize Vimal's engineering skills",
  "Tell me about the UFDR Analyzer & GreenWipe",
  "What is his education at CSJMU Kanpur?",
  "Why is Vimal a strong fit for internships?",
  "How can I contact Vimal?"
];

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hello! I am Vimal's portfolio assistant. Feel free to ask about his education at CSJMU Kanpur, technical skills in Python/Java/AWS, projects, or certifications.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    audioManager.playClick();
    const userMessage: ChatMessage = { 
      role: 'user', 
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    if (!queryText) setInput('');
    setIsLoading(true);

    setTimeout(scrollToBottom, 50);

    const responseText = await sendMessageToGemini(textToSend);
    
    setMessages(prev => [...prev, { 
      role: 'model', 
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setIsLoading(false);
    audioManager.playSuccess();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[92vw] sm:w-[410px] bg-[#171513] border border-[#2e2a25] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[550px]"
          >
            {/* Header */}
            <div className="bg-[#13110f] p-4 flex justify-between items-center border-b border-[#26221f]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#26221f] border border-[#38322c] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#c26747]" />
                </div>
                <div>
                  <h3 className="font-serif-display font-semibold text-[#f5f2eb] text-sm tracking-wide flex items-center gap-1.5">
                    <span>Portfolio Assistant</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#81b29a]" />
                  </h3>
                  <p className="text-[10px] font-mono text-[#8c8273]">Trained on Vimal's Resume</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  audioManager.playClick();
                }} 
                className="p-1.5 rounded-full bg-[#221f1c] text-[#a89f91] hover:text-[#f5f2eb] transition-colors"
                data-cursor="hover"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Suggested Prompt Chips */}
            <div className="p-2.5 bg-[#141210] border-b border-[#26221f] flex gap-1.5 overflow-x-auto no-scrollbar">
              {SUGGESTED_QUERIES.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full bg-[#221f1c] hover:bg-[#2b2723] border border-[#332e29] text-[11px] text-[#a89f91] hover:text-[#f5f2eb] whitespace-nowrap transition-all flex items-center gap-1 shrink-0 font-light"
                  data-cursor="hover"
                >
                  <span>{q}</span>
                  <ArrowRight className="w-2.5 h-2.5 text-[#c26747]" />
                </button>
              ))}
            </div>

            {/* Messages Container */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[260px] max-h-[330px]"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#c26747] text-[#0e0d0c] font-medium rounded-br-none'
                        : 'bg-[#221f1c] text-[#d6cec2] rounded-bl-none border border-[#2e2a25]'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    {msg.timestamp && (
                      <span className={`block text-[9px] mt-1 font-mono ${msg.role === 'user' ? 'text-[#0e0d0c]/70' : 'text-[#8c8273]'}`}>
                        {msg.timestamp}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#221f1c] p-3 rounded-2xl rounded-bl-none border border-[#2e2a25] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#c26747] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#c26747] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#c26747] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-[11px] font-mono text-[#a89f91] ml-1">Reviewing background...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-3 border-t border-[#26221f] bg-[#13110f]">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about Vimal..."
                  className="flex-1 bg-[#1c1917] text-[#f5f2eb] placeholder-[#5c554c] text-xs px-3.5 py-2.5 rounded-xl border border-[#2e2a25] focus:border-[#c26747] outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-[#c26747] hover:bg-[#d47858] text-[#0e0d0c] px-3.5 py-2 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
                  data-cursor="hover"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          audioManager.playClick();
        }}
        className="px-4 py-3 rounded-full bg-[#1c1917] hover:bg-[#26221f] text-[#f5f2eb] font-mono text-xs flex items-center gap-2.5 border border-[#38322c] shadow-xl z-50 cursor-pointer transition-colors"
        data-cursor="chat"
        title="Chat with Assistant"
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4 text-[#c26747]" />
            <span>Close</span>
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-[#c26747]" />
            <span className="tracking-wide">AI Assistant</span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
