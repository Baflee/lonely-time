import { Document } from 'mongoose';

export interface User extends Document {
  id: string;
  email: string;
  password: string;
  registrationDate: Date;
  age: string;
  occupation: string;
}
