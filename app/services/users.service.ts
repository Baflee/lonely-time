import axios from 'axios';
import { User } from '../utils/interfaces/user';

interface SignInResponse {
    authToken: string;
    refreshToken: string;
    user: any;
}

class UsersService {
    async logIn(credentials: User): Promise<SignInResponse> {
        try {
            const response = await axios.post<SignInResponse>('http://10.13.15.140:3000/users/login', credentials);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const usersService = new UsersService();