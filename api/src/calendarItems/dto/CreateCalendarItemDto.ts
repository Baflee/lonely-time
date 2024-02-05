import { IsArray, IsString, IsEnum, IsNumber, IsOptional, ValidateNested, IsDate, IsBoolean, IsEmail } from 'class-validator';
import { EventFrequency, EventType } from '../calendarItems.enums';
import { Type } from 'class-transformer';

class RecurrenceDTO {
    @IsOptional()
    @IsEnum(EventFrequency)
    frequency?: EventFrequency;

    @IsOptional()
    @IsNumber()
    interval?: number;

    @IsOptional()
    @IsDate()
    until?: Date;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    byDay?: string[];

    @IsOptional()
    @IsNumber()
    byMonthDay?: number;

    @IsOptional()
    @IsNumber()
    byYearDay?: number;

    @IsOptional()
    @IsNumber()
    byWeekNo?: number;

    @IsOptional()
    @IsNumber()
    byMonth?: number;

    @IsOptional()
    @IsNumber()
    bySetPos?: number;

    @IsOptional()
    @IsString()
    weekStart?: string;
}

class ScheduleDTO {
    @IsDate()
    start: Date;

    @IsDate()
    end: Date;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecurrenceDTO)
    recurrence?: RecurrenceDTO;
}

export class CalendarItemDTO {
    @IsString()
    organizer: string;

    @IsArray()
    @IsEmail({}, { each: true })
    participants: string[];

    @IsEnum(EventType)
    type: EventType;

    @IsBoolean()
    mobility: boolean;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    priority: number;

    @IsString()
    location: string;

    @ValidateNested()
    @Type(() => ScheduleDTO)
    schedule: ScheduleDTO;
}