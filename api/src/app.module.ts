import { Module } from '@nestjs/common';
import { DatabaseModule } from './db.module';
import { UsersModule } from './users/users.module';
import { CalendarItemsModule } from './calendarItems/calendarItems.module';
import { GPTModule } from './gpt/gpt.module';

@Module({
  imports: [DatabaseModule, UsersModule, CalendarItemsModule, GPTModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
