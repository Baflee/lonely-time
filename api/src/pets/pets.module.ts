import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { petSchema } from './schemas/pets.schema';
import { UsersService } from '../users/users.service';
import { userSchema } from 'src/users/schemas/users.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Pet', schema: petSchema }, { name: 'User', schema: userSchema }])],
    controllers: [PetsController],
    providers: [PetsService, UsersService],
})
export class PetsModule {}
