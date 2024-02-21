import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, LoginUserDto } from './dto/UserDto';
import { User } from './interfaces/users.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ResponseErrorRequest } from '../../../shared/interfaces/content';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<ResponseErrorRequest> {
    try {
      // Check if the email already exists in the database
      const existingUser = await this.userModel.findOne({ email: createUserDto.email });
      if (existingUser) {
        throw { statusCode: 409, message: 'L\'email est déjà utilisé' }; // Conflict
      }
  
      // Check if the passwords match
      if (createUserDto.password != createUserDto.passwordConfirmation) {
        throw { statusCode: 400, message: 'Les mots de passe ne correspondent pas' }; // Bad Request
      }
  
      // Password strength validation: >8 characters, includes numbers and special characters
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordRegex.test(createUserDto.password)) {
        throw { statusCode: 400, message: 'Le mot de passe doit contenir au moins 8 caractères, inclure au moins un chiffre et un caractère spécial' }; // Bad Request
      }
  
      // If the email is unique, the passwords match, and the password is strong, proceed to create the user
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = new this.userModel({
        email: createUserDto.email,
        password: hashedPassword,
        preferences: {},
      });

      newUser.save();
  
      return { statusCode: 200, message: 'Votre compte a été créer' };
    } catch (error) {
      console.error(error);
  
      if (!error.statusCode) {
        throw { statusCode: 500, message: 'Erreur interne du serveur' };
      }
  
      throw error;
    }
  }

  async validateUser(loginUserDto: LoginUserDto) {
    try {
      const user = await this.userModel.findOne({ email: loginUserDto.email });
  
      // If the user doesn't exist
      if (!user) {
        throw { statusCode: 404, message: 'L\'utilisateur n\'existe pas' };
      }
  
      // If the password is incorrect
      if (!(await bcrypt.compare(loginUserDto.password, user.password))) {
        throw { statusCode: 401, message: 'Mot de passe invalide' };
      }
  
      // User found and password is correct, proceed with token generation
      const payload = { email: user.email, sub: user._id };
      const authToken = jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '7d' });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET);


      return { statusCode: 200, message: 'Connexion réussie', content: { authToken, refreshToken, user }};
  
    } catch (error) {
      console.error(error);
    
  
      if (!error.statusCode) {
        throw { statusCode: 500, message: 'Erreur interne du serveur' };
      };
  
      throw error;
    }
  }
}
