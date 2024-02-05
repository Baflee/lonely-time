import { Document } from 'mongoose';
import { EventType, EventFrequency } from '../calendarItems.enums';

interface Recurrence {
    frequency?: EventFrequency;
    interval?: number;
    until?: Date;
    byDay?: string[];
    byMonthDay?: number;
    byYearDay?: number;
    byWeekNo?: number;
    byMonth?: number;
    bySetPos?: number;
    weekStart?: string;
}
  
interface Schedule {
    start: Date;
    end: Date;
    recurrence?: Recurrence;
}
  
export interface CalendarItem extends Document {
    organizer: string;
    participants: string[];
    type: EventType;
    mobility: boolean;
    title: string;
    description: string;
    priority: number;
    location: string;
    schedule: Schedule;
}