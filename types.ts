/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface PersonalInfo {
  name: string;
  role: string;
  college: string;
  tagline: string;
  objective: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl?: string;
  status: string;
  strengths: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Languages' | 'Web' | 'Cloud & DevOps' | 'Tools';
  color: string;
  tags?: string[];
  description?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Productivity' | 'Forensics & Analysis' | 'Security & Utilities';
  description: string;
  details?: string;
  tags: string[];
  modelType: 'cyber-cube' | 'hologram-torus' | 'neural-sphere' | 'spatial-prism' | 'quantum-core';
  githubUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period?: string;
  score: string;
  notes?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  education: EducationItem[];
  strengths: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp?: string;
  isError?: boolean;
}

export type ViewMode = 'immersive' | 'resume' | 'editor';

export type CursorMode = 'default' | 'hover' | 'drag-3d' | 'launch' | 'inspect' | 'copy' | 'chat';

