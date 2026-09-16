import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRoadmapById } from './roadmap.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Domain-specific templates for generating highly detailed, multi-stream branching decision trees.
 * Every template starts from Class 8/9 -> Class 10 -> 3-4 High School Streams -> Entrance Exams/Portfolios ->
 * Degrees -> Internships & Certifications -> Entry Role -> Senior Role -> Executive Leadership.
 */
const DOMAIN_PROFILES = {
  // Creative & Design Domain
  creative: {
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

  // Tech, Software & AI Domain
  tech: {
    matches: ['software', 'data', 'cloud', 'cyber', 'ai', 'devops', 'web', 'machine', 'engineer', 'developer', 'computer'],
    middleSchool: 'Middle School (Class 8 & 9: Math, Logic & Basic Coding / Scratch)',
    class10: 'Complete Class 10 Boards (Science & Mathematics Focus)',
    streams: [
      { id: 'stream-science-pcm', label: 'Science Track (PCM + Computer Science / IP)', stream: 'Engineering Track' },
      { id: 'stream-commerce-cs', label: 'Commerce Track with Mathematics & Computers', stream: 'Applied Computing Track' },
      { id: 'stream-science-gen', label: 'General Science Track (Physics, Chemistry, Biology & Math)', stream: 'Multidisciplinary Tech' },
      { id: 'stream-diploma-cs', label: 'Polytechnic Diploma in Computer Science / IT (3-Yr)', stream: 'Diploma Track' }
    ],
    entrances: [
      { id: 'ent-jee', label: 'National / State Entrances (JEE Main & Adv / BITSAT / CET)', stream: 'Engineering Track' },
      { id: 'ent-cuet-bca', label: 'University Entrance Tests (CUET / IPU CET / NIMCET Prep)', stream: 'Applied Computing Track' },
      { id: 'ent-lateral', label: 'State Lateral Entry Exam (Direct 2nd-Year B.Tech)', stream: 'Diploma Track' }
    ],
    degrees: [
      { id: 'deg-btech', label: 'B.Tech / B.E. in Computer Science / AI / Related Specialization', stream: 'Engineering Track' },
      { id: 'deg-bca', label: 'BCA (Bachelor of Computer Applications) + MCA Pathway', stream: 'Applied Computing Track' },
      { id: 'deg-bsc-cs', label: 'B.Sc in Computer Science / Data Science / Applied Math', stream: 'Multidisciplinary Tech' }
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

  // Healthcare & Medicine Domain
  medical: {
    matches: ['doctor', 'nurse', 'pharm', 'medical', 'biotech', 'physio', 'dental', 'health', 'surgeon'],
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
      { id: 'ent-paramedical', label: 'State Paramedical & Nursing Aptitude Tests', stream: 'Allied Health Track' }
    ],
    degrees: [
      { id: 'deg-mbbs', label: 'MBBS / BDS Professional Degree Program', stream: 'Clinical Medicine Track' },
      { id: 'deg-biotech', label: 'B.Sc / B.Tech in Biotechnology / Biomedical Sciences', stream: 'Biomedical & Research Track' },
      { id: 'deg-allied', label: 'B.Pharm / B.Sc Nursing / BPT (Physiotherapy)', stream: 'Allied Health Track' }
    ],
    experience: [
      { id: 'cert-clinical', label: 'Post-Graduate Specialty Exam (NEET-PG / USMLE / Fellowships)' },
      { id: 'internship', label: 'Mandatory 1-Year Hospital Rotational Clinical Residency' }
    ],
    roles: (title) => [
      { id: 'role-entry', label: `Resident Doctor / Junior ${title}` },
      { id: 'role-senior', label: `Senior Consultant / Specialist Physician` },
      { id: 'role-lead', label: `Medical Director / Chief of Medicine / Department Head` }
    ]
  },

  // Business, Finance & Management Domain
  business: {
    matches: ['chartered', 'accountant', 'finance', 'market', 'business', 'manage', 'consult', 'product', 'bank', 'econom'],
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
    matches: ['law', 'advocate', 'legal', 'judge', 'civil', 'ias', 'ips', 'policy', 'governance'],
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
  }
};

/**
 * Finds matching domain profile or creates an intelligent generalized profile.
 */
const getDomainProfile = (careerId, title) => {
  const query = `${careerId} ${title}`.toLowerCase();
  for (const [key, profile] of Object.entries(DOMAIN_PROFILES)) {
    if (profile.matches.some(m => query.includes(m))) {
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
      type: 'entrance-exam',
      level: 4,
      stream: ent.stream
    });
    // Connect corresponding stream to entrance
    const correspondingStream = profile.streams[idx] || profile.streams[0];
    edges.push({ source: correspondingStream.id, target: ent.id });
  });

  // 5. Level 5: Undergraduate Degrees & Higher Education
  profile.degrees.forEach((deg, idx) => {
    nodes.push({
      id: deg.id,
      label: deg.label,
      type: 'degree',
      level: 5,
      stream: deg.stream
    });
    // Connect entrance exam to degree
    const correspondingEntrance = profile.entrances[idx] || profile.entrances[0];
    edges.push({ source: correspondingEntrance.id, target: deg.id });
  });

  // If there is a lateral entry diploma entrance, connect it to first degree
  const lateralEnt = profile.entrances.find(e => e.id.includes('lateral') || e.stream === 'Vocational Track');
  if (lateralEnt && profile.degrees[0]) {
    edges.push({ source: lateralEnt.id, target: profile.degrees[0].id });
  }

  // 6. Level 6: Certifications & Internships
  profile.experience.forEach((exp, idx) => {
    nodes.push({
      id: exp.id,
      label: exp.label,
      type: idx === 0 ? 'certification' : 'internship',
      level: 6,
      stream: 'Core'
    });
    // Connect all degrees to experience nodes
    profile.degrees.forEach((deg) => {
      edges.push({ source: deg.id, target: exp.id });
    });
  });

  // 7. Levels 7, 8, 9: Career Progression Roles
  const roles = profile.roles(title);
  roles.forEach((r, idx) => {
    const roleLevel = 7 + idx;
    nodes.push({
      id: r.id,
      label: r.label,
      type: idx === 0 ? 'job' : idx === 1 ? 'job' : 'promotion',
      level: roleLevel,
      stream: 'Core'
    });

    if (idx === 0) {
      // Connect experience nodes to entry role
      profile.experience.forEach((exp) => {
        edges.push({ source: exp.id, target: r.id });
      });
    } else {
      // Connect previous role to current role
      edges.push({ source: roles[idx - 1].id, target: r.id });
    }
  });

  return { id: careerId, nodes, edges };
};

/**
 * Retrieves the flow tree for a given career ID.
 * 
 * @param {string} careerId - Kebab-case career ID (e.g. 'graphic-designer')
 * @returns {Object|null} The flow tree object or null if not found
 */
export const getFlowTreeById = (careerId) => {
  if (!careerId) return null;
  const roadmap = getRoadmapById(careerId);
  return generateDynamicBranchingTree(careerId, roadmap);
};
