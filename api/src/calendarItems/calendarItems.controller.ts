import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CalendarItemDTO } from './dto/CreateCalendarItemDto';
import { CalendarItemsService } from './calendarItems.service';

@Controller('calendarItems')
export class CalendarItemsController {
  constructor(private readonly calendarItemsService: CalendarItemsService) {}

  @Post()
  async createCalendarItem(@Body() createItemDto: CalendarItemDTO) {
    return this.calendarItemsService.createItem(createItemDto);
  }

  @Post('/many') // Assuming you want to post many items with a different route
  async createManyCalendarItems(@Body() createItemsDto: CalendarItemDTO[]) {
    return this.calendarItemsService.createManyItems(createItemsDto);
  }

  @Put(':id')
  async updateCalendarItem(
    @Param('id') id: string,
    @Body() updateItemDto: CalendarItemDTO,
  ) {
    return this.calendarItemsService.updateItem(id, updateItemDto);
  }

  @Delete(':id')
  async deleteCalendarItem(@Param('id') id: string) {
    return this.calendarItemsService.deleteItem(id);
  }

  @Delete('/many') // Assuming you want to delete many items with a different route
  async deleteManyCalendarItems(@Body() ids: string[]) {
    return this.calendarItemsService.deleteManyItems(ids);
  }

  @Get()
  async getAllEvents() {
    return this.calendarItemsService.getEvents();
  }

  @Get('/availability')
  async getAvailability(
    @Query('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : undefined;
    return this.calendarItemsService.getAvailability(userId, start, end);
  }

  @Get(':userId')
  async findUserCalendar(@Param('userId') userId: string) {
    return this.calendarItemsService.findUserCalendar(userId);
  }
}