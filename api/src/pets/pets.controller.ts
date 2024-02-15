import { Controller, Post, Body, Get } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto, GetPetDto, PetRequestDto } from './dto/petsDto';

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

    @Post('/get')
    async findAllPetsByUserId(@Body() getPetDto: GetPetDto) {
      return this.petsSevice.findAllPetsByUserId(getPetDto);
    }
}