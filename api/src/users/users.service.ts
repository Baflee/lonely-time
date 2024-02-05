import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, LoginUserDto, AiProfileDto } from './dto/UserDto';
import { User } from './interfaces/users.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    console.log('PASSWORD' + createUserDto.password);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      email: createUserDto.email,
      password: hashedPassword,
      preferences: {},
    });

    return newUser.save();
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({ email: loginUserDto.email });
    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      const payload = { email: user.email, sub: user._id };
      const authToken = jwt.sign(payload, process.env.AUTH_SECRET, {
        expiresIn: '7d',
      });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET);
      return { authToken, refreshToken, user };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async createAIProfile(
    userId: string,
    aiProfileDto: AiProfileDto,
  ): Promise<User> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the user already has aiProfiles field, if not initialize it
    if (!user.aiProfiles) {
      user.aiProfiles = [];
    }

    // Add the new AI profile to the user's aiProfiles array
    user.aiProfiles.push(aiProfileDto);

    // Save the updated user document
    return user.save();
  }
}
