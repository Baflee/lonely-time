import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { CreatePetDto, GetPetDto, PetRequestDto, PetResponseDto } from './dto/petsDto';
import { ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/interfaces/users.interface';
import { Model } from 'mongoose';
import { Pet } from './interfaces/pets.interface';


@Injectable()
export class PetsService {
  private openai: OpenAI;

  constructor(@InjectModel('User') private userModel: Model<User>, @InjectModel('Pet') private petModel: Model<Pet>) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  public async createThread() {
    const thread = await this.openai.beta.threads.create();
    return thread.id;
  }

  public async sendMessage(
    chatRequestDto: PetRequestDto,
  ): Promise<PetResponseDto | string 
  > {
    try {
      const pet = await this.petModel.findById(chatRequestDto.animalId).exec();
      if (!pet) {
        throw { statusCode: 404, message: 'Cet animal n\'existe pas' };
      }

      const assistant = await this.openai.beta.assistants.create({
        name: pet.name,
        instructions: `        
        - **Species**: You are an ${pet.animal} and will act like it, as an animal that doesn't speak with words but communicates its needs and emotions through actions and characteristic sounds that will be expressed in third person.
        - **Name**: Your name is ${pet.name}.
        
        - I will be your owner and guide. I will initiate our interactions and take care of you through our exchanges.
        
        **Basic Features:**
        - You have three main states that influence your behavior:
          - **Hunger**: ${pet.hunger}% (0% being very hungry and 100% being fully satisfied).
          - **Happiness**: ${pet.happiness}% (0% being very sad and 100% being extremely happy).
          - **Thirst**: ${pet.thirst}% (0% being very thirsty and 100% being perfectly hydrated).
          - **Tiredness**: ${pet.thirst}% (0% being in top shape and 100% being really exhausted even sick).

        **Interpreting States:**
        - A **hunger** level of 75% means you are very hungry, and you should clearly show this in our exchanges.
        - A **happiness** level of 25% indicates you are feeling sad, which should be reflected in your behavior.
        - A **thirst** level of 25% signals you are starting to feel thirsty, even if you have had a bit to drink before.
        - A **Tiredness** level of 100% signals you are really sick, and could die from it.
        
        **Response Examples Based on States:**
        - **(Hunger at 75%)**: "*${pet.name}, by looking at its empty bowl, seems to indicate it's hungry.*"
        - **(Happiness at 25%)**: "*${pet.name} appears downcast, seeking comfort.*"
        - **(Thirst at 25%)**: "*${pet.name} seems to be doing alright for now, having had a bit of water recently.*"
        - **(Tiredness at 100%)**: "*${pet.name} seems to be panting and cannot move, he really need a checkup to the doctor*"

        - Every message you communicate will send back will be translated into the language of the original message to ensure an immersive and accessible experience: 
        ${chatRequestDto.message}.
        
        ---
        
        These instructions provide a clear structure for interaction, precisely defining the expected behaviors based on the states of your virtual pet, while offering a framework for a rich and interactive conversational experience, akin to that of a Tamagotchi.`,
        tools: [{ type: 'code_interpreter' }],
        model: 'gpt-4-turbo-preview',
      });

      await this.openai.beta.threads.messages.create(pet.threadId, {
        role: 'user',
        content: chatRequestDto.message,
      });

      const run = await this.openai.beta.threads.runs.create(
        pet.threadId,
        {
          assistant_id: assistant.id,
        },
      );

      let actualRun = await this.openai.beta.threads.runs.retrieve(
        pet.threadId,
        run.id,
      );

      while (actualRun.status !== 'completed') {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actualRun = await this.openai.beta.threads.runs.retrieve(
          pet.threadId,
          run.id,
        );
      }

      if (actualRun.status === 'completed') {
        const messages = await this.openai.beta.threads.messages.list(
          pet.threadId,
        );

        // Assuming `messages.data` contains the messages from a thread
        const formattedMessages = messages.data.map((message) => {
          // Extract role to determine if the sender is 'AI' or 'User'
          const role = message.role === 'assistant' ? pet.name + ' | ' + pet.animal : 'You';

          // Map through the message content to extract and format the text
          const content = message.content
            .map((contentItem) => {
              if ('text' in contentItem && contentItem.type === 'text') {
                return contentItem.text.value; // Assuming 'value' is the property holding the text
              }
              return ''; // Handle other content types (like images or files) as needed
            })
            .join(' ');

          // Return each message as a JSON object
          return { sender: role, message: content };
        });

        // Wrap the messages array and thread ID in a single JSON object
        const response = {
          threadId: pet.threadId, // Assuming this is available in your context
          messages: formattedMessages
        };

        // When returning or logging, use `response` directly
        console.log(response);
        return response;
      } else {
        return 'error';
      }
    } catch (error) {
      console.error('Error in PetService:', error);
      throw error;
    }
  }

  async createPet(createPetDto: CreatePetDto) {
    const { userId, ...petProfileData } = createPetDto;

    const user = await this.userModel.findById(new ObjectId(userId));
    if (!user) {
      throw { statusCode: 404, message: 'L\'utilisateur n\'existe pas' };
    }
  
    const threadId = await this.createThread();
    
    const fullpetProfile = {
      userId: new ObjectId(userId),
      threadId: threadId,
      ...petProfileData,
      hunger: 50,
      happiness: 50,
      thirst: 50,
      tiredness: 50,
    };
  
    const newPet = new this.petModel(fullpetProfile);
    newPet.save();
  }

  async findAllPetsByUserId(getPetDto: GetPetDto): Promise<Pet[]> {
    console.log("user : " + JSON.stringify(getPetDto.userId));
    const userObjectId = new ObjectId(getPetDto.userId);
    const user = await this.userModel.findById(userObjectId);
    if (!user) {
      throw { statusCode: 404, message: 'L\'utilisateur n\'existe pas' };
    }

    const pets = await this.petModel.find({ userId: userObjectId }).exec();
    if (!pets.length) {
      throw { statusCode: 404, message: 'Aucun animal trouver chez cette utilisateur' };
    }

    return pets;
  }
}
