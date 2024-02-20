import { Controller, Post, Body } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto, GetMessagesDto, GetPetDto, PetRequestDto } from './dto/petsDto';

@Controller('pets')
export class PetsController {
    constructor(private readonly petsSevice: PetsService) {}

    @Post('/speak')
    async chat(@Body() petRequestDto: PetRequestDto) {
        return this.petsSevice.sendMessage(petRequestDto);
    }

    @Post('/create')
    async createAIProfile(@Body() createpetDto: CreatePetDto) {
      return this.petsSevice.createPet(createpetDto);
    }

    @Post('/getPets')
    async findAllPetsByUserId(@Body() getPetDto: GetPetDto) {
      return this.petsSevice.findAllPetsByUserId(getPetDto);
    }

    @Post('/getMessages')
    async fetchMessageThread(@Body() getMessagesDto: GetMessagesDto) {
      return this.petsSevice.fetchMessageThread(getMessagesDto.petName, getMessagesDto.threadId);
    }
}