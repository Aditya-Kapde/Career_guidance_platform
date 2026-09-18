import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRoadmapById } from './roadmap.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Domain-specific templates for generating highly detailed, multi-stream branching decision trees.
 * Every template starts from Class 8/9 -> Class 10 -> High School Streams -> Entrance Exams ->
 * Degrees -> Internships & Certifications -> Entry Role -> Senior Role -> Executive Leadership.
 */
const DOMAIN_PROFILES = {
  // Core Engineering Domain (Civil, Mechanical, Structural, Architecture)
  engineering: {
    careerIds: ['civil-engineer', 'mechanical-engineer', 'architect'],
    matches: ['civil-engineer', 'mechanical-engineer', 'architect', 'civil', 'structural', 'mechanical'],
    middleSchool: 'Middle School (Class 8 & 9: Math, Physics & Technical Drawing Aptitude)',
    class10: 'Complete Class 10 Boards (Science & Mathematics Foundation)',
    streams: [
      { id: 'stream-pcm', label: 'Science Track (PCM - Physics, Chemistry & Mathematics)', stream: 'Engineering Track' },
      { id: 'stream-diploma-core', label: 'Polytechnic Diploma in Core Engineering (3-Yr)', stream: 'Diploma Track' },
      { id: 'stream-pcmb', label: 'Science Track (PCMB - Physics, Chemistry, Math & Biology)', stream: 'Applied Technical Track' }
    ],
    entrances: [
      { id: 'ent-jee', label: 'National / State Entrances (JEE Main & Adv / BITSAT / State CET)', stream: 'Engineering Track' },
      { id: 'ent-lateral-eng', label: 'State Lateral Entry Exam (Direct 2nd-Year B.Tech / B.E.)', stream: 'Diploma Track' },
      { id: 'ent-nata', label: 'Architecture & Design Entrances (NATA / JEE Paper 2 / CUET)', stream: 'Applied Technical Track' }
    ],
    degrees: [
      { id: 'deg-btech-eng', label: 'B.Tech / B.E. in Civil / Mechanical / Architectural Engineering', stream: 'Engineering Track' },
      { id: 'deg-barch', label: 'B.Arch (Bachelor of Architecture - 5 Year Program)', stream: 'Applied Technical Track' },
      { id: 'deg-btech-lat', label: 'B.Tech / B.E. via Lateral Entry Specialization', stream: 'Diploma Track' }
    ],
    experience: [
      { id: 'cert-cad-sim', label: 'Professional CAD, BIM & Simulation Tools (AutoCAD, Revit, STAAD.Pro, SolidWorks)' },
      { id: 'internship', label: 'Site / Plant / Structural Design Engineering Internship (6 Months)' }
    ],
    roles: (title) => [
      { id: 'role-entry', label: `Graduate Engineer Trainee / Junior ${title}` },
      { id: 'role-senior', label: `Senior ${title} / Project Lead Engineer` },
      { id: 'role-lead', label: `Chief Project Engineer / Director of Operations / Partner` }
    ]
  },

  // Tech, Software & AI Domain (Strictly Software, Data, AI, Cloud, Cybersecurity)
  tech: {
    careerIds: ['software-engineer', 'data-scientist', 'cloud-engineer', 'cybersecurity-analyst', 'ai-engineer'],
    matches: ['software', 'data-scientist', 'cloud', 'cybersecurity', 'ai-engineer', 'developer'],
    middleSchool: 'Middle School (Class 8 & 9: Math, Logic & Basic Coding / Scratch)',
    class10: 'Complete Class 10 Boards (Science & Mathematics Focus)',
    streams: [
      { id: 'stream-science-pcm', label: 'Science Track (PCM + Computer Science / IP)', stream: 'Engineering Track' },
      { id: 'stream-commerce-cs', label: 'Commerce Track with Mathematics & Computers', stream: 'Applied Computing Track' },
      { id: 'stream-diploma-cs', label: 'Polytechnic Diploma in Computer Science / IT (3-Yr)', stream: 'Diploma Track' }
    ],
    entrances: [
      { id: 'ent-jee', label: 'National / State Entrances (JEE Main & Adv / BITSAT / CET)', stream: 'Engineering Track' },
      { id: 'ent-cuet-bca', label: 'University Entrance Tests (CUET / IPU CET / NIMCET Prep)', stream: 'Applied Computing Track' },
      { id: 'ent-lateral', label: 'State Lateral Entry Exam (Direct 2nd-Year B.Tech CS/IT)', stream: 'Diploma Track' }
    ],
    degrees: [
      { id: 'deg-btech', label: 'B.Tech / B.E. in Computer Science / AI / Related Specialization', stream: 'Engineering Track' },
      { id: 'deg-bca', label: 'BCA (Bachelor of Computer Applications) + MCA Pathway', stream: 'Applied Computing Track' },
      { id: 'deg-bsc-cs', label: 'B.Sc in Computer Science / Data Science / Applied Math', stream: 'Applied Computing Track' }
    ],
    experience: [
      { id: 'cert-cloud-git', label: 'Cloud & Domain Certifications + Open-Source Contributions' },
      { id: 'internship', label: 'Software Engineering / Tech Associate Internship' }
    ],
    roles: (title) => [
      { id: 'role-entry', label: `Associate / Junior ${title}` },
      { id: 'role-senior', label: `Senior ${title} / Tech Lead` },
      { id: 'role-lead', label: `Principal Architect / VP of Engineering / CTO` }
    ]
  },

  // Creative & Design Domain
  creative: {
    careerIds: ['ux-designer', 'graphic-designer'],
    matches: ['graphic', 'design', 'ui', 'ux', 'fashion', 'animat', 'interior', 'visual', 'art'],
    middleSchool: 'Middle School (Class 8 & 9: Visual Arts, Sketching & Creative Aptitude)',
    class10: 'Complete Class 10 Boards (Foundational Academic Milestone)',
    streams: [
      { id: 'stream-arts', label: 'Humanities & Arts (Fine Arts & Design Electives)', stream: 'Arts & Design Track' },
      { id: 'stream-science', label: 'Science Track (PCM & Informatics Practices)', stream: 'Digital & Tech Track' },
      { id: 'stream-commerce', label: 'Commerce Stream (Marketing & Visual Media)', stream: 'Commercial Media Track' },
      { id: 'stream-diploma', label: 'Polytechnic Diploma in Commercial Art / Animation (3-Yr)', stream: 'Vocational Track' }
    ],
    entrances: [
      { id: 'ent-design', label: 'Design Entrances (UCEED / NID DAT / NIFT / SEED)', stream: 'Arts & Design Track' },
      { id: 'ent-tech', label: 'Tech & Media Entrances (JEE B.Des / CUET / AIEEE)', stream: 'Digital & Tech Track' },
      { id: 'portfolio-prep', label: 'Design Portfolio Review & Industry Tool Mastery (Adobe/Figma)', stream: 'Commercial Media Track' },
      { id: 'lateral-entry', label: 'State Lateral Entry Exam (Direct 2nd-Year Degree Entry)', stream: 'Vocational Track' }
    ],
    degrees: [
      { id: 'deg-bdes', label: 'B.Des (Communication / Industrial / UI-UX Design)', stream: 'Arts & Design Track' },
      { id: 'deg-tech-design', label: 'B.Tech / B.Sc in Digital Media & Interactive Computing', stream: 'Digital & Tech Track' },
      { id: 'deg-bfa', label: 'BFA (Bachelor of Fine Arts - Applied Arts & Media)', stream: 'Commercial Media Track' }
    ],
    experience: [
      { id: 'cert-industry', label: 'Industry Specialization & Real-World Studio Capstone' },
      { id: 'internship', label: 'Design Agency / Corporate Studio Internship (6 Months)' }
    ],
    roles: (title) => [
      { id: 'role-entry', label: `Junior / Associate ${title}` },
      { id: 'role-senior', label: `Senior ${title} / Art Director` },
      { id: 'role-lead', label: `Creative Director / Head of Design` }
    ]
  },

  // Healthcare & Medicine Domain
  medical: {
    careerIds: ['doctor', 'psychologist'],
    matches: ['doctor', 'nurse', 'pharm', 'medical', 'biotech', 'physio', 'dental', 'health', 'surgeon', 'psychologist'],
    middleSchool: 'Middle School (Class 8 & 9: Biology & Environmental Science Basics)',
    class10: 'Complete Class 10 Boards (Biology & Natural Sciences)',
    streams: [
      { id: 'stream-pcb', label: 'Science Track (Physics, Chemistry, Biology - PCB)', stream: 'Clinical Medicine Track' },
      { id: 'stream-pcmb', label: 'Science Track (PCMB - Biology + Mathematics)', stream: 'Biomedical & Research Track' },
      { id: 'stream-allied', label: 'Allied Health Sciences / Vocational Stream', stream: 'Allied Health Track' }
    ],
    entrances: [
      { id: 'ent-neet-ug', label: 'National Eligibility Entrance Test (NEET UG)', stream: 'Clinical Medicine Track' },
      { id: 'ent-biotech', label: 'Biotech / Allied Health Entrance Exams (CUET / State Entrances)', stream: 'Biomedical & Research Track' },
      { id: 'ent-paramedical', label: 'State Paramedical & Psychology Aptitude Tests', stream: 'Allied Health Track' }
    ],
    degrees: [
      { id: 'deg-mbbs', label: 'MBBS / BDS Professional Degree Program', stream: 'Clinical Medicine Track' },
      { id: 'deg-biotech', label: 'B.Sc / B.Tech in Biotechnology / Biomedical Sciences', stream: 'Biomedical & Research Track' },
      { id: 'deg-allied', label: 'BA/B.Sc Psychology / B.Pharm / Allied Health Program', stream: 'Allied Health Track' }
    ],
    experience: [
      { id: 'cert-clinical', label: 'Post-Graduate Specialty Exam (NEET-PG / RCI License / Fellowships)' },
      { id: 'internship', label: 'Mandatory 1-Year Hospital Rotational Clinical Residency' }
    ],
    roles: (title) => [
      { id: 'role-entry', label: `Resident Doctor / Junior ${title}` },
      { id: 'role-senior', label: `Senior Consultant / Specialist Practitioner` },
      { id: 'role-lead', label: `Medical Director / Department Head / Chief Practitioner` }
    ]
  },

  // Business, Finance & Management Domain
  business: {
    careerIds: ['chartered-accountant', 'financial-analyst', 'investment-banker', 'business-analyst', 'entrepreneur', 'digital-marketer'],
    matches: ['chartered', 'accountant', 'finance', 'market', 'business', 'manage', 'consult', 'product', 'bank', 'econom', 'entrepreneur', 'marketer'],
    middleSchool: 'Middle School (Class 8 & 9: Mathematics, Economics & Communication)',
    class10: 'Complete Class 10 Boards (Social Science & Mathematics)',
    streams: [
      { id: 'stream-commerce-math', label: 'Commerce Stream (Accountancy, Economics & Applied Math)', stream: 'Finance & Accounting Track' },
      { id: 'stream-commerce-mgmt', label: 'Commerce Stream (Business Studies, Entrepreneurship & Marketing)', stream: 'Management & Marketing Track' },
      { id: 'stream-science-mgmt', label: 'Science Stream (PCM / Analytics Electives)', stream: 'Quantitative Business Track' },
      { id: 'stream-humanities-econ', label: 'Humanities Stream (Economics, Public Policy & Statistics)', stream: 'Economics & Strategy Track' }
    ],
    entrances: [
      { id: 'ent-ca-found', label: 'CA Foundation / CMA / CFA Level 1 Registration', stream: 'Finance & Accounting Track' },
      { id: 'ent-ipmat', label: 'Management Aptitude Entrances (IPMAT / JIPMAT / NPAT / CUET)', stream: 'Management & Marketing Track' },
      { id: 'ent-cuet-econ', label: 'University Economics Entrances (CUET / DU / Ashoka / NMIMS)', stream: 'Economics & Strategy Track' }
    ],
    degrees: [
      { id: 'deg-bcom-ca', label: 'B.Com (Hons) + CA Intermediate & Articleship Track', stream: 'Finance & Accounting Track' },
      { id: 'deg-bba-bms', label: 'BBA / BMS / Integrated 5-Year MBA (IIMs / Top B-Schools)', stream: 'Management & Marketing Track' },
      { id: 'deg-ba-econ', label: 'BA / B.Sc in Economics, Finance & Applied Econometrics', stream: 'Economics & Strategy Track' }
    ],
    experience: [
      { id: 'cert-cfa-data', label: 'Financial Modeling, CFA / Digital Analytics Credential' },
      { id: 'internship', label: 'Corporate / Investment Banking / Consulting Summer Internship' }
    ],
    roles: (title) => [
      { id: 'role-entry', label: `Junior Analyst / Associate ${title}` },
      { id: 'role-senior', label: `Senior ${title} / Strategic Manager` },
      { id: 'role-lead', label: `Chief Financial Officer (CFO) / Partner / VP` }
    ]
  },

  // Law, Civil Services & Governance Domain
  law: {
    careerIds: ['lawyer'],
    matches: ['lawyer', 'advocate', 'legal', 'judge', 'ias', 'ips', 'policy', 'governance'],
    middleSchool: 'Middle School (Class 8 & 9: Social Studies, Debating & Critical Reading)',
    class10: 'Complete Class 10 Boards (Foundational Humanities & Ethics)',
    streams: [
      { id: 'stream-arts-legal', label: 'Humanities & Social Sciences (Political Science & Legal Studies)', stream: 'Legal & Policy Track' },
      { id: 'stream-commerce-law', label: 'Commerce Stream (Business Law & Economics)', stream: 'Corporate Law Track' },
      { id: 'stream-science-law', label: 'Science Stream (Analytical Thinking & Logic)', stream: 'IPR & Cyber Law Track' }
    ],
    entrances: [
      { id: 'ent-clat', label: 'Common Law Admission Test (CLAT / AILET / LSAT)', stream: 'Legal & Policy Track' },
      { id: 'ent-cuet-law', label: 'University Law & Governance Entrances (CUET / SLAT / MH CET)', stream: 'Corporate Law Track' }
    ],
    degrees: [
      { id: 'deg-ba-llb', label: '5-Year Integrated BA-LLB (National Law Universities)', stream: 'Legal & Policy Track' },
      { id: 'deg-bba-llb', label: '5-Year Integrated BBA-LLB (Corporate & Business Law)', stream: 'Corporate Law Track' },
      { id: 'deg-llb-3yr', label: 'Graduation Degree + 3-Year LLB Professional Program', stream: 'IPR & Cyber Law Track' }
    ],
    experience: [
      { id: 'cert-bar', label: 'All India Bar Examination (AIBE) / Professional Legal Enrollment' },
      { id: 'internship', label: 'Judicial Clerkship & High Court / Law Firm Internship' }
    ],
    roles: (title) => [
      { id: 'role-entry', label: `Junior Advocate / Associate ${title}` },
      { id: 'role-senior', label: `Senior Legal Counsel / Partner` },
      { id: 'role-lead', label: `General Counsel / Senior Advocate / High Court Judge` }
    ]
  },

  // Education Domain
  education: {
    careerIds: ['teacher'],
    matches: ['teacher', 'educator', 'professor', 'pedagogy'],
    middleSchool: 'Middle School (Class 8 & 9: Foundational Academics & Peer Tutoring)',
    class10: 'Complete Class 10 Boards (Academic Excellence)',
    streams: [
      { id: 'stream-arts-edu', label: 'Humanities & Languages Stream', stream: 'Humanities Track' },
      { id: 'stream-science-edu', label: 'Science Track (PCM / PCB Focus)', stream: 'STEM Education Track' },
      { id: 'stream-commerce-edu', label: 'Commerce & Economics Stream', stream: 'Commerce Education Track' }
    ],
    entrances: [
      { id: 'ent-cuet-edu', label: 'Central University Entrance Test (CUET UG/PG)', stream: 'Humanities Track' },
      { id: 'ent-bed', label: 'State / National B.Ed Entrance Examinations', stream: 'STEM Education Track' }
    ],
    degrees: [
      { id: 'deg-ba-bed', label: 'Integrated 4-Year B.A. B.Ed / B.Sc. B.Ed Program', stream: 'Humanities Track' },
      { id: 'deg-bsc-bed', label: 'Bachelor of Science (B.Sc) followed by 2-Year B.Ed', stream: 'STEM Education Track' },
      { id: 'deg-med', label: 'Master of Education (M.Ed) / Master of Arts (M.A.)', stream: 'Commerce Education Track' }
    ],
    experience: [
      { id: 'cert-tet', label: 'Central Teacher Eligibility Test (CTET / State TET / NET Prep)' },
      { id: 'internship', label: 'School Classroom Teaching Practice & Curriculum Internship' }
    ],
    roles: (title) => [
      { id: 'role-entry', label: `Assistant / Primary School ${title}` },
      { id: 'role-senior', label: `Senior Secondary ${title} / Department Head` },
      { id: 'role-lead', label: `Principal / Academic Director / Education Dean` }
    ]
  }
};

/**
 * Finds matching domain profile with exact careerId resolution.
 */
const getDomainProfile = (careerId, title) => {
  const normId = (careerId || '').toLowerCase().trim();

  // 1. Direct careerId matching (Highest Precedence)
  for (const [, profile] of Object.entries(DOMAIN_PROFILES)) {
    if (profile.careerIds && profile.careerIds.includes(normId)) {
      return profile;
    }
  }

  // 2. Exact keyword / token matching
  const tokens = `${normId} ${(title || '').toLowerCase()}`.split(/[\s-_]+/);
  for (const [, profile] of Object.entries(DOMAIN_PROFILES)) {
    if (profile.matches.some(m => tokens.includes(m))) {
      return profile;
    }
  }

  // Generalized High-Quality Fallback Profile
  return {
    middleSchool: 'Middle School (Class 8 & 9: Core Academics & Aptitude Exploration)',
    class10: 'Complete Class 10 Boards (Foundational Academic Milestone)',
    streams: [
      { id: 'stream-science', label: 'Science Track (PCM / Technology Track)', stream: 'Technical Track' },
      { id: 'stream-commerce', label: 'Commerce Track (Economics, Math & Business)', stream: 'Commerce & Management Track' },
      { id: 'stream-arts', label: 'Humanities & Applied Arts Track', stream: 'Applied & Creative Track' },
      { id: 'stream-diploma', label: 'Polytechnic Diploma / Vocational Track (3-Yr)', stream: 'Vocational Track' }
    ],
    entrances: [
      { id: 'ent-nat', label: 'National Entrance & Aptitude Exams (JEE / CUET / State CET)', stream: 'Technical Track' },
      { id: 'ent-mgmt', label: 'Management & University Entrance (CUET / IPMAT)', stream: 'Commerce & Management Track' },
      { id: 'ent-portfolio', label: 'Domain Portfolio & Foundation Skill Tests', stream: 'Applied & Creative Track' },
      { id: 'ent-lateral', label: 'State Lateral Entry Examination', stream: 'Vocational Track' }
    ],
    degrees: [
      { id: 'deg-tech', label: 'Bachelor of Technology / Bachelor of Science (Honours)', stream: 'Technical Track' },
      { id: 'deg-mgmt', label: 'Bachelor of Business Administration / B.Com (Hons)', stream: 'Commerce & Management Track' },
      { id: 'deg-applied', label: 'Bachelor of Arts / Applied Professional Degree', stream: 'Applied & Creative Track' }
    ],
    experience: [
      { id: 'cert-industry', label: 'Industry Specialization Credentials & Capstone Projects' },
      { id: 'internship', label: 'Professional Summer / 6-Month Industry Internship' }
    ],
    roles: (t) => [
      { id: 'role-entry', label: `Associate / Junior ${t}` },
      { id: 'role-senior', label: `Senior ${t} / Specialist Lead` },
      { id: 'role-lead', label: `Director / Department Head / Executive` }
    ]
  };
};

/**
 * Generates an extensive multi-stream branching decision tree from middle school to executive leadership.
 */
export const generateDynamicBranchingTree = (careerId, roadmap) => {
  const title = roadmap?.title || careerId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const profile = getDomainProfile(careerId, title);

  const nodes = [];
  const edges = [];

  // 1. Level 1: Middle School Foundation (Class 8 & 9)
  nodes.push({
    id: 'foundation',
    label: profile.middleSchool,
    type: 'education',
    level: 1,
    stream: 'Core'
  });

  // 2. Level 2: Class 10 Milestone
  nodes.push({
    id: 'class10',
    label: profile.class10,
    type: 'education',
    level: 2,
    stream: 'Core'
  });
  edges.push({ source: 'foundation', target: 'class10' });

  // 3. Level 3: Multiple 11th/12th Streams
  profile.streams.forEach((st) => {
    nodes.push({
      id: st.id,
      label: st.label,
      type: 'education',
      level: 3,
      stream: st.stream
    });
    edges.push({ source: 'class10', target: st.id });
  });

  // 4. Level 4: Entrance Exams & Preparation
  profile.entrances.forEach((ent, idx) => {
    nodes.push({
      id: ent.id,
      label: ent.label,
      type: 'exam',
      level: 4,
      stream: ent.stream
    });
    const parentStream = profile.streams[idx % profile.streams.length];
    if (parentStream) {
      edges.push({ source: parentStream.id, target: ent.id });
    }
  });

  // 5. Level 5: Degrees & Higher Education
  profile.degrees.forEach((deg, idx) => {
    nodes.push({
      id: deg.id,
      label: deg.label,
      type: 'degree',
      level: 5,
      stream: deg.stream
    });
    const parentEntrance = profile.entrances[idx % profile.entrances.length];
    if (parentEntrance) {
      edges.push({ source: parentEntrance.id, target: deg.id });
    }
  });

  // 6. Level 6: Certifications & Internships
  profile.experience.forEach((exp, idx) => {
    nodes.push({
      id: exp.id,
      label: exp.label,
      type: 'certification',
      level: 6,
      stream: 'Core'
    });
    // Link from all degrees to certifications/internships
    profile.degrees.forEach((deg) => {
      edges.push({ source: deg.id, target: exp.id });
    });
  });

  // 7. Level 7-9: Career Progression Roles
  const roles = profile.roles(title);
  roles.forEach((r, idx) => {
    nodes.push({
      id: r.id,
      label: r.label,
      type: 'role',
      level: 7 + idx,
      stream: 'Core'
    });
  });

  // Connect experience to Entry Role
  profile.experience.forEach((exp) => {
    edges.push({ source: exp.id, target: roles[0].id });
  });

  // Connect Roles sequentially
  for (let i = 0; i < roles.length - 1; i++) {
    edges.push({ source: roles[i].id, target: roles[i + 1].id });
  }

  return {
    careerId,
    title,
    nodes,
    edges,
    summary: `Structured multi-pathway career progression roadmap for ${title}.`
  };
};

export const getFlowTreeForCareer = (careerId) => {
  const roadmap = getRoadmapById(careerId);
  return generateDynamicBranchingTree(careerId, roadmap);
};

export const getFlowTreeById = getFlowTreeForCareer;
