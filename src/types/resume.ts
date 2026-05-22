export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Basics {
  name: string;
  label: string;
  summary: string;
  location: {
    city: string;
    countryCode: string;
    region: string;
  };
  profiles: Profile[];
}

export interface Work {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score?: string;
  courses?: string[];
}

export interface Award {
  title: string;
  date: string;
  awarder: string;
  summary: string;
}

export interface Skill {
  name: string;
  level: string;
  keywords: string[];
}

export interface Language {
  language: string;
  fluency: string;
}

export interface Project {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  associatedWith: string;
  keywords: string[];
  id?: string;
  text?: string;
  href?: string;
  preview?: string;
  technology?: string;
  links?: { text: string; href: string }[];
  projectsJsonDescription?: string;
}

export interface Resume {
  basics: Basics;
  work: Work[];
  education: Education[];
  awards: Award[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
}
