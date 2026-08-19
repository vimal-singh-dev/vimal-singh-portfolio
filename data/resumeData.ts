/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { ResumeData } from '../types';

export const INITIAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: 'VIMAL SINGH',
    role: 'B.Tech Information Technology',
    college: 'CSJMU Kanpur',
    tagline: 'Motivated IT student passionate about software development, cloud computing and DevOps concepts.',
    objective: 'Seeking an internship in Software Development, Cloud or DevOps to apply my skills and gain practical industry experience.',
    summary: 'Motivated IT student passionate about software development, cloud computing and DevOps concepts. Open to internship opportunities where I can grow and contribute to real-world projects.',
    email: 'cvimal144@gmail.com',
    phone: '9569944197',
    location: 'Kanpur, India',
    githubUrl: 'https://github.com/vimal-singh-dev',
    linkedinUrl: 'https://linkedin.com/in/vimal-singh-it',
    portfolioUrl: 'https://github.com/vimal-singh-dev',
    status: 'Open to Internship Opportunities',
    strengths: [
      'Quick learner with strong ownership mindset',
      'Good communication and teamwork',
      'Problem-solving and analytical thinking'
    ]
  },
  skills: [
    // Languages
    {
      id: 'python',
      name: 'Python',
      category: 'Languages',
      color: '#3b82f6',
      tags: ['Core Python', 'Scripting', 'Problem Solving'],
      description: 'Core language for scripting, backend automation, digital forensics, and algorithmic problem solving.'
    },
    {
      id: 'java',
      name: 'Java',
      category: 'Languages',
      color: '#f59e0b',
      tags: ['OOP', 'Core Java', 'Spring (Basics)'],
      description: 'Object-oriented programming, data structures, robust backend logic, and Java Spring concepts.'
    },
    {
      id: 'cpp',
      name: 'C++',
      category: 'Languages',
      color: '#06b6d4',
      tags: ['Data Structures', 'Algorithms', 'STL'],
      description: 'High-performance computing, memory fundamentals, Standard Template Library (STL), and competitive DSA.'
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'Languages',
      color: '#eab308',
      tags: ['ES6+', 'DOM', 'Async/Await'],
      description: 'Dynamic scripting, asynchronous event handling, DOM manipulation, and modern web application logic.'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Languages',
      color: '#6366f1',
      tags: ['Static Typing', 'Interfaces', 'Modern TS'],
      description: 'Strict type safety, custom interfaces, scalable architecture, and maintainable frontend/backend codebases.'
    },
    // Web
    {
      id: 'html-css',
      name: 'HTML & CSS',
      category: 'Web',
      color: '#ec4899',
      tags: ['Semantic HTML', 'Responsive CSS', 'Flexbox/Grid'],
      description: 'Semantic markup structure, modern responsive design, Flexbox, Grid, and cross-browser visual styling.'
    },
    {
      id: 'rest-apis',
      name: 'REST APIs',
      category: 'Web',
      color: '#10b981',
      tags: ['API Integration', 'JSON', 'Endpoints'],
      description: 'RESTful architecture, HTTP request lifecycles, JSON payload serialization, and client-server integration.'
    },
    // Cloud / DevOps
    {
      id: 'aws',
      name: 'AWS (EC2, IAM, S3, Lambda, VPC)',
      category: 'Cloud & DevOps',
      color: '#f97316',
      tags: ['EC2', 'IAM', 'S3', 'Lambda', 'VPC'],
      description: 'Cloud infrastructure provisioning, secure IAM permissions, S3 object storage, and serverless Lambda functions.'
    },
    {
      id: 'linux',
      name: 'Linux',
      category: 'Cloud & DevOps',
      color: '#a855f7',
      tags: ['CLI Commands', 'File Permissions', 'Environment Config'],
      description: 'Unix shell administration, file permissions, environment variables, daemon management, and system operations.'
    },
    {
      id: 'docker',
      name: 'Docker (Basics)',
      category: 'Cloud & DevOps',
      color: '#0ea5e9',
      tags: ['Containers', 'Images', 'Dockerfiles'],
      description: 'Containerization principles, Dockerfile creation, image building, and isolated application runtime environments.'
    },
    {
      id: 'git',
      name: 'Git',
      category: 'Cloud & DevOps',
      color: '#ef4444',
      tags: ['Version Control', 'Branching', 'Commits'],
      description: 'Distributed version control, atomic commits, feature branching, merging strategies, and source code management.'
    },
    {
      id: 'bash',
      name: 'Bash Scripting',
      category: 'Cloud & DevOps',
      color: '#14b8a6',
      tags: ['Automation', 'Shell Scripts', 'CLI'],
      description: 'Shell script automation, command pipeline chaining, routine cron tasks, and operational terminal workflows.'
    },
    // Tools
    {
      id: 'vscode',
      name: 'VS Code',
      category: 'Tools',
      color: '#0284c7',
      tags: ['Code Editing', 'Extensions', 'Debugging'],
      description: 'Primary IDE workflow with integrated terminal, debugging tools, linters, and productivity extensions.'
    },
    {
      id: 'github',
      name: 'GitHub',
      category: 'Tools',
      color: '#cbd5e1',
      tags: ['Repositories', 'Collaboration', 'Open Source'],
      description: 'Remote repository hosting, issue tracking, pull request reviews, and GitHub Actions CI/CD workflows.'
    },
    {
      id: 'postman',
      name: 'Postman',
      category: 'Tools',
      color: '#ff6c37',
      tags: ['API Testing', 'Collections', 'HTTP Requests'],
      description: 'API endpoint validation, automated request suites, response debugging, and environment variables testing.'
    }
  ],
  projects: [
    {
      id: 'habit-tracker',
      title: 'Habit Tracker App',
      category: 'Productivity',
      description: 'Productivity tool for habit management and streak tracking.',
      details: 'Designed to help users establish daily habits, track continuous streaks, and monitor personal productivity routines.',
      tags: ['JavaScript', 'Web', 'HTML/CSS', 'Productivity'],
      modelType: 'cyber-cube',
      githubUrl: 'https://github.com/vimal-singh-dev/habit-tracker-version-2.git'
    },
    {
      id: 'ufdr-analyzer',
      title: 'UFDR Analyzer',
      category: 'Forensics & Analysis',
      description: 'Forensic tool to extract and format UFDR report insights.',
      details: 'A forensic utility engineered to parse and extract valuable investigative insights and data reports from UFDR (Universal Forensic Extraction Device Report) files.',
      tags: ['Python', 'Forensics', 'Data Extraction', 'Analysis'],
      modelType: 'quantum-core',
      githubUrl: 'https://github.com/vimal-singh-dev/ufdr_analyzer.git'
    },
    {
      id: 'greenwipe',
      title: 'GreenWipe',
      category: 'Security & Utilities',
      description: 'Secure data wiping project.',
      details: 'A security-focused utility designed for secure and irreversible data wiping and disk sanitization.',
      tags: ['Security', 'Python / Scripting', 'Linux', 'Data Sanitization'],
      modelType: 'neural-sphere',
      githubUrl: 'https://github.com/vimal-singh-dev/GreenWipe--Data-Wiping-.git'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'AWS Solutions Architecture Virtual Experience',
      issuer: 'Forage'
    },
    {
      id: 'cert-2',
      title: 'Web Development with Java Spring',
      issuer: 'MindLuster'
    },
    {
      id: 'cert-3',
      title: 'Digital Strategy & Photo Editing',
      issuer: 'MindLuster'
    }
  ],
  achievements: [
    {
      id: 'achieve-1',
      title: 'Front-End Development Competition',
      organization: 'CSJMU Kanpur'
    }
  ],
  education: [
    {
      id: 'edu-btech',
      degree: 'B.Tech — Information Technology',
      institution: 'CSJMU Kanpur',
      period: '2023–2027',
      score: 'CGPA: 6.52 (Ongoing)'
    },
    {
      id: 'edu-12th',
      degree: 'Intermediate (12th)',
      institution: 'UP Board',
      score: '78.6%'
    }
  ],
  strengths: [
    'Quick learner with strong ownership mindset',
    'Good communication and teamwork',
    'Problem-solving and analytical thinking'
  ]
};
