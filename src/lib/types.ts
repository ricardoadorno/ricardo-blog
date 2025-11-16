// Blog Post Types
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  author?: string;
  tags?: string[];
  category?: string;
}

export interface PostData extends PostMeta {
  content: React.ReactElement;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  images?: string[];
  technologies: string[];
  category: 'Web App' | 'Tool' | 'Library' | 'Open Source' | 'Client Work';
  featured?: boolean;
  links: {
    live?: string;
    github?: string;
    case_study?: string;
  };
  stats?: {
    stars?: number;
    forks?: number;
    downloads?: number;
  };
  date: string;
  status: 'Active' | 'Archived' | 'In Progress';
}

// TOC Types
export interface TOCHeading {
  id: string;
  text: string;
  level: number;
}
