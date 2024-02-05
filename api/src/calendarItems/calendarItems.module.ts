import { Module } from '@nestjs/common';
import { CalendarItemsController } from './calendarItems.controller';
import { CalendarItemsService } from './calendarItems.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarItemSchema } from './schemas/calendarItems.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CalendarItem', schema: CalendarItemSchema }])
  ],
  controllers: [CalendarItemsController],
  providers: [CalendarItemsService],
})
export class CalendarItemsModule {}