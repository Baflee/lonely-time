import axios from 'axios';
import { User } from '../utils/interfaces/user';
import { ResponseErrorRequest } from '../../shared/interfaces/content';

class UsersService {
    async logIn(credentials: User): Promise<ResponseErrorRequest> {
        try {
            const response = await axios.post('http://10.13.15.140:3000/users/login', credentials);
            // Handle success
            return response.data as ResponseErrorRequest;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Handle server response error
                    console.error(error.response.data);
                    return error.response.data as ResponseErrorRequest;
                }
            }
            return { statusCode: 500, message: 'Erreur interne du serveur' };
        }
    }

    async signUp(credentials: User): Promise<ResponseErrorRequest>  {
        try {
            const response = await axios.post('http://10.13.15.140:3000/users/signup', credentials);
            // Handle success
            return response.data as ResponseErrorRequest;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Handle server response error
                    console.error(error.response.data);
                    return error.response.data as ResponseErrorRequest;
                }
            }

            return { statusCode: 500, message: 'Erreur interne du serveur' };
        }
    }
}

export const usersService = new UsersService();