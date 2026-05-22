export interface Media {
  type: 'image' | 'video' | 'youtube';
  url: string;
}

export interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  year: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Project {
  text: string;
  href: string;
  id: string;
  preview: string;
  description?: string;
  technology?: string;
  links?: { text: string; href: string }[];
}

export interface Resume {
  bio: string;
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
  projects: Project[];
}
