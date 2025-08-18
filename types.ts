
export interface Founder {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  image: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  media: string[];
  githubUrl: string;
  liveUrl?: string;
  tags: string[];
}

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}
