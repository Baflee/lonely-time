import axios from 'axios';
import { ResponseErrorRequest } from '../../shared/interfaces/content';

class PetsService {
    async getPet(userId: string): Promise<ResponseErrorRequest> {
        try {
            const response = await axios.post('http://192.168.1.14:3000/pets/getpets', userId);
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

export const petsService = new PetsService();