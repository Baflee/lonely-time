import { Injectable, NotFoundException } from '@nestjs/common';
import { CalendarItemDTO } from './dto/CreateCalendarItemDto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CalendarItem } from './interfaces/calendarItems.interface';

@Injectable()
export class CalendarItemsService {
  // Injecting the model into the service (Assuming you have set up MongooseModule)
  constructor(
    @InjectModel('CalendarItem') private calendarItemModel: Model<CalendarItem>,
  ) {}

  async createItem(createItemDto: CalendarItemDTO): Promise<CalendarItem> {
    const newCalendarItem = new this.calendarItemModel(createItemDto);
    return newCalendarItem.save();
  }

  async createManyItems(createItemsDto: CalendarItemDTO[]): Promise<CalendarItem[]> {
    return this.calendarItemModel.insertMany(createItemsDto);
  }

  async updateItem(id: string, updateItemDto: CalendarItemDTO): Promise<CalendarItem> {
    const updatedCalendarItem = await this.calendarItemModel.findByIdAndUpdate(id, updateItemDto, { new: true });
    if (!updatedCalendarItem) {
      throw new NotFoundException(`Calendar Item with ID "${id}" not found.`);
    }
    return updatedCalendarItem;
  }

  async deleteItem(id: string): Promise<CalendarItem> {
    const deletedCalendarItem = await this.calendarItemModel.findByIdAndDelete(id);
    if (!deletedCalendarItem) {
      throw new NotFoundException(`Calendar Item with ID "${id}" not found.`);
    }
    return deletedCalendarItem;
  }

  async deleteManyItems(ids: string[]): Promise<any> {
    const results = await this.calendarItemModel.deleteMany({ _id: { $in: ids } });
    if (results.deletedCount === 0) {
      throw new NotFoundException(`No Calendar Items found with the provided IDs.`);
    }
    return results;
  }

  async findUserCalendar(userId: string): Promise<CalendarItem[]> {
    return this.calendarItemModel.find({ organizer: userId }).exec();
  }

  async getEvents(): Promise<CalendarItem[]> {
    return this.calendarItemModel.find().exec();
  }

  async getAvailability(userId: string, startDate: Date, endDate?: Date): Promise<CalendarItem[]> {
    let query = {
      organizer: userId,
      'schedule.start': { $gte: startDate },
    };

    if (endDate) {
      query['schedule.end'] = { $lte: endDate };
    }

    return this.calendarItemModel.find(query).exec();
  }
}
