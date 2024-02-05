import { Document } from 'mongoose';

interface AIProfile {
    threadId: string;
    name: string;
    role: string;
    personalityTraits: string[];
    skills: string[];
    domainsOfExpertise: string[];
    languages: string[];
    customAttributes: Map<string, string>;
  }

export interface User extends Document {
    id: string;
    email: string;
    password: string;
    registrationDate: Date;
    age: string;
    occupation: string;
    AIProfiles: AIProfile[];
}
