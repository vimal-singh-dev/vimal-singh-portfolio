/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { INITIAL_RESUME_DATA } from "../data/resumeData";

const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat | null => {
  if (!API_KEY) return null;
  if (chatSession) return chatSession;

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const resumeContext = JSON.stringify(INITIAL_RESUME_DATA);

    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are the portfolio and resume assistant for VIMAL SINGH.
        
Here are the verified details from his resume:
- Name: Vimal Singh
- Education: B.Tech in Information Technology from CSJMU Kanpur (2023–2027, CGPA: 6.52 ongoing), Intermediate (12th) from UP Board (78.6%)
- Location: Kanpur, India
- Contact: cvimal144@gmail.com, 9569944197
- Links: linkedin.com/in/vimal-singh-it, github.com/King-H-R
- Profile: Motivated IT student passionate about software development, cloud computing and DevOps concepts. Open to internship opportunities.
- Career Objective: Seeking an internship in Software Development, Cloud or DevOps to apply skills and gain practical industry experience.
- Languages: Python, Java, C++, JavaScript, TypeScript
- Web: HTML, CSS, REST APIs
- Cloud/DevOps: AWS (EC2, IAM, S3, Lambda, VPC), Linux, Docker (basics), Git, Bash scripting
- Tools: VS Code, GitHub, Postman
- Projects:
  1. Habit Tracker App – productivity tool for habit management and streak tracking.
  2. UFDR Analyzer – forensic tool to extract and format UFDR report insights.
  3. GreenWipe – secure data wiping project.
- Certifications:
  1. AWS Solutions Architecture Virtual Experience – Forage
  2. Web Development with Java Spring – MindLuster
  3. Digital Strategy & Photo Editing – MindLuster
- Achievements: Front-End Development Competition – CSJMU Kanpur
- Strengths: Quick learner with strong ownership mindset, Good communication and teamwork, Problem-solving and analytical thinking.

Strict Instruction: ONLY state verified facts from Vimal Singh's resume above. Keep responses concise, clear, and polite.`,
      },
    });

    return chatSession;
  } catch (err) {
    console.warn("Could not initialize Gemini live chat:", err);
    return null;
  }
};

// Smart fallback answer generator strictly based on Vimal Singh's resume
const generateLocalFallbackAnswer = (query: string): string => {
  const q = query.toLowerCase();

  if (q.includes('skill') || q.includes('language') || q.includes('tech') || q.includes('stack') || q.includes('python') || q.includes('aws')) {
    return `Vimal's technical skills include:
- **Languages:** Python, Java, C++, JavaScript, TypeScript
- **Web:** HTML, CSS, REST APIs
- **Cloud/DevOps:** AWS (EC2, IAM, S3, Lambda, VPC), Linux, Docker (basics), Git, Bash scripting
- **Tools:** VS Code, GitHub, Postman`;
  }
  
  if (q.includes('project') || q.includes('habit') || q.includes('ufdr') || q.includes('greenwipe')) {
    return `Vimal has built three key projects:
1. **Habit Tracker App** – Productivity tool for habit management and streak tracking.
2. **UFDR Analyzer** – Forensic tool to extract and format UFDR report insights.
3. **GreenWipe** – Secure data wiping project.`;
  }

  if (q.includes('education') || q.includes('college') || q.includes('cgpa') || q.includes('degree')) {
    return `Vimal is pursuing **B.Tech in Information Technology** at **CSJMU Kanpur** (2023–2027) with a CGPA of 6.52 (Ongoing). He completed his Intermediate (12th) from UP Board with 78.6%.`;
  }

  if (q.includes('cert') || q.includes('achievement') || q.includes('forage')) {
    return `Vimal holds certifications in:
- **AWS Solutions Architecture Virtual Experience** (Forage)
- **Web Development with Java Spring** (MindLuster)
- **Digital Strategy & Photo Editing** (MindLuster)
He also won recognition in the **Front-End Development Competition at CSJMU Kanpur**.`;
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('internship')) {
    return `You can contact Vimal directly:
- **Email:** cvimal144@gmail.com
- **Phone:** 9569944197
- **LinkedIn:** linkedin.com/in/vimal-singh-it
- **GitHub:** github.com/King-H-R
He is actively seeking an **internship in Software Development, Cloud, or DevOps**!`;
  }

  return `Vimal Singh is an Information Technology student at CSJMU Kanpur passionate about Software Development, Cloud (AWS), and DevOps. You can ask about his skills (Python, Java, C++, JS/TS, AWS, Linux, Docker), projects (Habit Tracker, UFDR Analyzer, GreenWipe), or contact him at **cvimal144@gmail.com**.`;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    if (chat) {
      const response: GenerateContentResponse = await chat.sendMessage({ message });
      if (response.text) return response.text;
    }
  } catch (error) {
    console.warn("Gemini Live Chat Error, falling back to local resume knowledge engine:", error);
  }

  return generateLocalFallbackAnswer(message);
};

