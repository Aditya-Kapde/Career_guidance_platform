import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const oldPath = path.join(__dirname, 'src/data/careerRoadmaps.json');
const newPath = path.join(__dirname, 'src/data/careerKnowledgeBase.json');

const oldData = JSON.parse(fs.readFileSync(oldPath, 'utf-8'));

const newData = oldData.map(career => {
  return {
    ...career,
    // Expanded Schema
    recommendedSubjects: ["Mathematics", "Physics", "Computer Science"],
    degreeOptions: ["Bachelor's in Computer Science", "B.Tech IT", "BCA"],
    coreSkills: ["Problem Solving", "Analytical Thinking", "Attention to Detail", "Logical Reasoning"],
    toolsAndTechnologies: ["Python", "JavaScript", "SQL", "Git", "Docker"],
    beginnerProjects: [
      { name: "Portfolio Website", description: "Create a simple static portfolio website using HTML/CSS/JS." },
      { name: "Calculator App", description: "Build a functional calculator to understand logic flows." }
    ],
    intermediateProjects: [
      { name: "Weather Dashboard", description: "Fetch and display weather data from a public API." },
      { name: "Task Management App", description: "A CRUD application for managing daily tasks with a backend." }
    ],
    advancedProjects: [
      { name: "E-Commerce Platform", description: "Full-stack application with authentication, payment gateway, and database." },
      { name: "Machine Learning Predictor", description: "Train a simple model and serve it via an API." }
    ],
    certifications: ["AWS Certified Cloud Practitioner", "Google Data Analytics Certificate", "CompTIA Security+"],
    internshipSuggestions: ["Software Engineering Intern", "Data Analyst Intern", "Frontend Developer Intern"],
    portfolioIdeas: ["Open Source Contributions", "Technical Blog Writing", "Hackathon Projects"],
    timeline: [
      { year: "Year 1", focus: "Fundamentals & Logic Building" },
      { year: "Year 2", focus: "Data Structures & Core Projects" },
      { year: "Year 3", focus: "Specialization & Internships" },
      { year: "Year 4", focus: "Advanced Topics & Placement Preparation" }
    ],
    futureRoles: ["Senior Developer", "Tech Lead", "Engineering Manager", "Solutions Architect"],
    emergingFields: ["AI Integration", "Web3 Development", "Cloud-Native Engineering"],
    estimatedDuration: "3-4 Years for Undergraduate",
    difficultyLevel: career.overview?.difficulty || "Medium"
  };
});

fs.writeFileSync(newPath, JSON.stringify(newData, null, 2), 'utf-8');
console.log('Successfully created careerKnowledgeBase.json with ' + newData.length + ' careers.');
