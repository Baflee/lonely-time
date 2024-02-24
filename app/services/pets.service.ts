import axios from 'axios';
import { ResponseErrorRequest } from '../../shared/interfaces/content';

class PetsService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.API_URL || "http://10.13.15.140:3000";
    }

    async getPets(userId: string): Promise<ResponseErrorRequest> {
        try {
            const response = await axios.post(`${this.baseUrl}/pets/getPets`, {userId});
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

    async createPet(userId:string, name: string, animal:string, personalityTraits:string[], skills:string[]): Promise<ResponseErrorRequest> {
        try {
            const response = await axios.post(`${this.baseUrl}/pets/create`, {userId, name, animal, personalityTraits, skills});
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

    async getMessages(petName:string, threadId: string): Promise<ResponseErrorRequest> {
        try {
            const response = await axios.post(`${this.baseUrl}/pets/getMessages`, {petName, threadId});
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

    async sendMessage(petId: string, message: string): Promise<ResponseErrorRequest> {
        try {
            const response = await axios.post(`${this.baseUrl}/pets/speak`, {petId, message});
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