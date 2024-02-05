import { EventFrequency, EventType } from '../calendarItems.enums';
import * as mongoose from 'mongoose';

const RecurrenceSchema = new mongoose.Schema({
  frequency: {
    type: String,
    enum: EventFrequency,
    required: false
  },
  interval: { type: Number, required: false },
  until: { type: Date, required: false },
  byDay: [{ type: String, required: false }],
  byMonthDay: { type: Number, required: false },
  byYearDay: { type: Number, required: false },
  byWeekNo: { type: Number, required: false },
  byMonth: { type: Number, required: false },
  bySetPos: { type: Number, required: false },
  weekStart: { type: String, required: false }
}, { _id: false, required: false });

const ScheduleSchema = new mongoose.Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  recurrence: { type: RecurrenceSchema }
}, { _id: false });

export const CalendarItemSchema = new mongoose.Schema({
  organizer: { type: String, required: true },
  participants: [{ type: String, required: true }],
  type: {
    type: String,
    enum: EventType,
    required: true
  },
  mobility: { type: Boolean, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: Number, required: true },
  location: { type: String, required: true },
  schedule: { type: ScheduleSchema, required: true }
}, { minimize: false });

export const CalendarItem = mongoose.model('CalendarItem', CalendarItemSchema);

