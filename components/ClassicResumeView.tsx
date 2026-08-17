/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ResumeData } from '../types';
import { Mail, Printer, ArrowLeft, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../services/audioService';

interface ClassicResumeViewProps {
  data: ResumeData;
  onBackTo3D: () => void;
}

const ClassicResumeView: React.FC<ClassicResumeViewProps> = ({ data, onBackTo3D }) => {
  const handlePrint = () => {
    audioManager.playClick();
    window.print();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.personalInfo.email);
    audioManager.playSuccess();
    confetti({ particleCount: 40, spread: 45, origin: { y: 0.6 }, colors: ['#c26747', '#e9c46a', '#f5f2eb'] });
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-[#171513] border border-[#2b2723] print:hidden">
        <button
          onClick={onBackTo3D}
          className="px-4 py-2 rounded-xl bg-[#221f1c] text-[#f5f2eb] text-xs font-mono font-medium hover:bg-[#2c2723] flex items-center gap-2 border border-[#332e29]"
          data-cursor="hover"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#c26747]" />
          <span>Return to Interactive Portfolio</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyEmail}
            className="px-3.5 py-2 rounded-xl bg-[#221f1c] text-[#d6cec2] text-xs font-mono flex items-center gap-1.5 hover:bg-[#2c2723] border border-[#332e29]"
            data-cursor="copy"
          >
            <Mail className="w-3.5 h-3.5 text-[#c26747]" />
            <span>Copy Email</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-[#c26747] text-[#0e0d0c] text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-[#d47858] cursor-pointer shadow-sm"
            data-cursor="hover"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Resume Document Sheet */}
      <div className="bg-[#171513] border border-[#2b2723] rounded-3xl p-8 md:p-14 text-[#d6cec2] print:bg-white print:text-black print:border-none print:p-0 shadow-xl">
        {/* Header */}
        <div className="border-b border-[#2b2723] print:border-gray-300 pb-6 mb-7">
          <h1 className="text-4xl font-serif-display font-semibold text-[#f5f2eb] print:text-black">
            {data.personalInfo.name}
          </h1>
          <p className="text-base font-serif-display italic text-[#e8b298] print:text-stone-800 mt-1">
            {data.personalInfo.role} — {data.personalInfo.college}
          </p>
          <p className="text-xs text-[#8c8273] print:text-gray-600 font-mono mt-2 leading-relaxed">
            {data.personalInfo.location} • {data.personalInfo.phone} • {data.personalInfo.email} • {data.personalInfo.githubUrl} • {data.personalInfo.linkedinUrl}
          </p>
        </div>

        {/* Profile */}
        <div className="mb-7">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#c26747] print:text-stone-900 border-b border-[#2b2723] print:border-gray-300 pb-1.5 mb-2.5">
            Profile & Summary
          </h2>
          <p className="text-xs text-[#a89f91] print:text-gray-700 leading-relaxed font-light">
            {data.personalInfo.profile || data.personalInfo.summary}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-7">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#c26747] print:text-stone-900 border-b border-[#2b2723] print:border-gray-300 pb-1.5 mb-2.5">
            Skills & Core Stack
          </h2>
          <div className="space-y-1.5 text-xs text-[#a89f91] print:text-gray-700">
            <div><strong className="text-[#f5f2eb] print:text-black font-medium">Languages:</strong> Python, Java, C++, JavaScript, TypeScript</div>
            <div><strong className="text-[#f5f2eb] print:text-black font-medium">Web:</strong> HTML, CSS, REST APIs</div>
            <div><strong className="text-[#f5f2eb] print:text-black font-medium">Cloud/DevOps:</strong> AWS (EC2, IAM, S3, Lambda, VPC), Linux, Docker (basics), Git, Bash scripting</div>
            <div><strong className="text-[#f5f2eb] print:text-black font-medium">Tools:</strong> VS Code, GitHub, Postman</div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-7">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#c26747] print:text-stone-900 border-b border-[#2b2723] print:border-gray-300 pb-1.5 mb-2.5">
            Certifications
          </h2>
          <ul className="space-y-1 text-xs text-[#a89f91] print:text-gray-700">
            {data.certifications.map(c => (
              <li key={c.id}>• <span className="font-medium text-[#f5f2eb] print:text-black">{c.title}</span> — {c.issuer}</li>
            ))}
          </ul>
        </div>

        {/* Achievements */}
        <div className="mb-7">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#c26747] print:text-stone-900 border-b border-[#2b2723] print:border-gray-300 pb-1.5 mb-2.5">
            Achievements
          </h2>
          <ul className="space-y-1 text-xs text-[#a89f91] print:text-gray-700">
            {data.achievements.map(a => (
              <li key={a.id}>• <span className="font-medium text-[#f5f2eb] print:text-black">{a.title}</span> — {a.organization}</li>
            ))}
          </ul>
        </div>

        {/* Strengths */}
        <div className="mb-7">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#c26747] print:text-stone-900 border-b border-[#2b2723] print:border-gray-300 pb-1.5 mb-2.5">
            Key Strengths
          </h2>
          <ul className="space-y-1 text-xs text-[#a89f91] print:text-gray-700">
            {data.strengths.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </div>

        {/* Education */}
        <div className="mb-7">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#c26747] print:text-stone-900 border-b border-[#2b2723] print:border-gray-300 pb-1.5 mb-2.5">
            Education
          </h2>
          <div className="space-y-2.5 text-xs">
            {data.education.map(e => (
              <div key={e.id}>
                <div className="font-medium text-[#f5f2eb] print:text-black">{e.degree} — <span className="font-normal text-[#8c8273] print:text-gray-600">{e.institution} {e.period ? `(${e.period})` : ''}</span></div>
                <div className="text-[#c26747] print:text-stone-800 font-mono text-[11px] mt-0.5">{e.score}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-7">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#c26747] print:text-stone-900 border-b border-[#2b2723] print:border-gray-300 pb-1.5 mb-2.5">
            Projects
          </h2>
          <div className="space-y-2 text-xs">
            {data.projects.map(p => (
              <div key={p.id}>
                <span className="font-medium text-[#f5f2eb] print:text-black">{p.title}</span> – <span className="text-[#a89f91] print:text-gray-700 font-light">{p.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Career Objective */}
        <div>
          <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#c26747] print:text-stone-900 border-b border-[#2b2723] print:border-gray-300 pb-1.5 mb-2.5">
            Career Objective
          </h2>
          <p className="text-xs text-[#a89f91] print:text-gray-700 leading-relaxed font-light">
            {data.personalInfo.objective}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClassicResumeView;
