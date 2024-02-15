import { Module } from '@nestjs/common';
import { DatabaseModule } from './db.module';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [DatabaseModule, UsersModule, PetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
