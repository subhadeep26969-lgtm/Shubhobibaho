export interface Rsvp {
  id?: string;
  name: string;
  attending: boolean;
  guestsCount: number;
  createdAt: string;
}

export interface Blessing {
  id?: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface Photo {
  id?: string;
  imageUrl: string;
  uploadedBy: string;
  caption?: string;
  createdAt: string;
}

export interface Riddle {
  id: number;
  question: string;
  hint: string;
  answer: string;
}

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
