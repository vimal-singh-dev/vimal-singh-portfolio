/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { PersonalInfo } from '../types';
import { Mail, Copy, Check, Send, Github, Linkedin, MapPin, Phone, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { audioManager } from '../services/audioService';
import GlowCard from './GlowCard';

interface ContactPortalProps {
  personalInfo: PersonalInfo;
}

const ContactPortal: React.FC<ContactPortalProps> = ({ personalInfo }) => {
  const [copied, setCopied] = useState(false);
  const [senderEmail, setSenderEmail] = useState('');
  const [messageSubject, setMessageSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    audioManager.playSuccess();
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 }, colors: ['#c26747', '#e9c46a', '#f5f2eb'] });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !messageBody) return;

    setIsSending(true);
    audioManager.playClick();

    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      audioManager.playSuccess();
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 }, colors: ['#c26747', '#e9c46a', '#f5f2eb'] });
      setMessageBody('');
      setMessageSubject('');
      setSenderEmail('');
      setTimeout(() => setSentSuccess(false), 4000);
    }, 900);
  };

  return (
    <GlowCard
      glowColor="#c26747"
      glowRadius={650}
      baseOpacity={0.06}
      hoverOpacity={0.2}
      initial={{ opacity: 0, y: 40, filter: 'blur(14px)', scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="w-full relative rounded-3xl bg-[#171513]/90 border border-[#2b2723] p-8 md:p-12 backdrop-blur-md shadow-2xl overflow-hidden hover:border-[#c26747]/60 transition-colors"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        
        {/* Left Column: Contact Details */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#221f1c] border border-[#332e29] text-[#c26747] text-xs font-mono mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#81b29a] animate-pulse" />
              <span>{personalInfo.status}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif-display font-semibold text-[#f5f2eb] mb-3">
              Let's Connect & <span className="italic text-[#e8b298]">Collaborate</span>
            </h2>

            <p className="text-[#a89f91] text-sm leading-relaxed mb-6 font-light">
              {personalInfo.objective}
            </p>

            {/* Email Card with Mouse-Following Radial Glow & Hover Lift */}
            <GlowCard
              glowColor="#c26747"
              glowRadius={280}
              baseOpacity={0.05}
              hoverOpacity={0.25}
              whileHover={{ y: -2 }}
              className="p-4 rounded-2xl bg-[#1f1b18] border border-[#2b2723] hover:border-[#c26747]/60 flex items-center justify-between gap-3 mb-4 transition-all duration-200 shadow-md"
            >
              <div className="flex items-center justify-between gap-3 w-full">
                <div className="flex items-center gap-3 truncate">
                  <div className="w-10 h-10 rounded-xl bg-[#26221f] flex items-center justify-center text-[#c26747] shrink-0 border border-[#332e29]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-[#8c8273] block">Direct Email:</span>
                    <a href={`mailto:${personalInfo.email}`} className="text-sm font-medium text-[#f5f2eb] hover:text-[#c26747] transition-colors truncate block">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyEmail}
                  className="px-3.5 py-1.5 rounded-xl bg-[#2b2723] hover:bg-[#38322c] text-[#d6cec2] hover:text-[#f5f2eb] text-xs font-mono flex items-center gap-1.5 border border-[#38322c] cursor-pointer transition-colors shrink-0"
                  data-cursor="copy"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#81b29a]" /> : <Copy className="w-3.5 h-3.5 text-[#c26747]" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </motion.button>
              </div>
            </GlowCard>

            {/* Phone & Location with Hover highlights */}
            <div className="space-y-3 text-xs font-mono text-[#a89f91]">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1c1917] border border-[#282420] hover:border-[#38322c] transition-colors">
                <div className="w-7 h-7 rounded-lg bg-[#221f1c] flex items-center justify-center text-[#c26747]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{personalInfo.phone}</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1c1917] border border-[#282420] hover:border-[#38322c] transition-colors">
                <div className="w-7 h-7 rounded-lg bg-[#221f1c] flex items-center justify-center text-[#c26747]">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>{personalInfo.location} ({personalInfo.college})</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-6 border-t border-[#26221f] flex items-center gap-3">
            {personalInfo.githubUrl && (
              <motion.a
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-[#221f1c] text-[#a89f91] hover:text-[#f5f2eb] hover:bg-[#2b2723] border border-[#332e29] hover:border-[#c26747]/60 transition-colors shadow-sm"
                data-cursor="hover"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            )}
            {personalInfo.linkedinUrl && (
              <motion.a
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-[#221f1c] text-[#a89f91] hover:text-[#f5f2eb] hover:bg-[#2b2723] border border-[#332e29] hover:border-[#c26747]/60 transition-colors shadow-sm"
                data-cursor="hover"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Right Column: Direct Message Box with Radial Glow */}
        <GlowCard 
          glowColor="#e9c46a"
          glowRadius={480}
          baseOpacity={0.04}
          hoverOpacity={0.18}
          className="lg:col-span-7 bg-[#1c1917]/90 border border-[#2b2723] hover:border-[#e9c46a]/50 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-lg transition-colors"
        >
          <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#26221f] text-xs font-mono text-[#8c8273]">
            <span>Direct Message Dispatch</span>
            <span className="text-[#c26747]">Internship / Job Inquiry</span>
          </div>

          {sentSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#81b29a]/20 text-[#81b29a] flex items-center justify-center mx-auto border border-[#81b29a]/30">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif-display font-semibold text-[#f5f2eb]">Message Dispatched</h3>
              <p className="text-xs text-[#a89f91]">
                Thank you! Your message has been routed to {personalInfo.email}.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#8c8273] mb-1.5">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="recruiter@company.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#171513] border border-[#2e2a25] text-[#f5f2eb] placeholder-[#5c554c] text-sm focus:border-[#c26747] focus:ring-1 focus:ring-[#c26747]/40 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#8c8273] mb-1.5">Subject</label>
                  <input
                    type="text"
                    placeholder="Software Engineering / Cloud Inquiry"
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#171513] border border-[#2e2a25] text-[#f5f2eb] placeholder-[#5c554c] text-sm focus:border-[#c26747] focus:ring-1 focus:ring-[#c26747]/40 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8c8273] mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Hi Vimal, we reviewed your projects and background in AWS/Python and would like to discuss an opportunity..."
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#171513] border border-[#2e2a25] text-[#f5f2eb] placeholder-[#5c554c] text-sm focus:border-[#c26747] focus:ring-1 focus:ring-[#c26747]/40 outline-none transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSending}
                className="w-full py-3.5 rounded-xl bg-[#c26747] hover:bg-[#d47858] text-[#0e0d0c] font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-[#c26747]/20"
                data-cursor="launch"
              >
                {isSending ? (
                  <div className="w-4 h-4 border-2 border-[#0e0d0c] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Message</span>
                  </>
                )}
              </motion.button>
            </form>
          )}
        </GlowCard>

      </div>
    </GlowCard>
  );
};

export default ContactPortal;
