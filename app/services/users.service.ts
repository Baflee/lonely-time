import axios from 'axios';
import { User } from '../utils/interfaces/user';
import { ResponseErrorRequest } from '../../shared/interfaces/content';
class UsersService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.API_URL || "http://10.13.15.140:3000";
    }

    async logIn(credentials: User): Promise<ResponseErrorRequest> {
        try {
            const response = await axios.post(`${this.baseUrl}/users/login`, credentials);
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
            const response = await axios.post(`${this.baseUrl}/users/signup`, credentials);
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

    async sendNotification(fcmToken: string, title: string, body: string) {
        const message = {
            to: fcmToken,
            notification: {
                title: title,
                body: body,
            },
        };
    
        await axios.post('https://fcm.googleapis.com/fcm/send', message, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAKYPCr4o:APA91bG0bzEDiPDTmRt4RlGfo8GmV2ch727gjjgUolC30_fHDzOnQwoNhJXBYA7LlParBYc5NkAOqpGPOWND7GkefnP9gR0yxwKMmhykZuQYJl2qrehYxpkOj3HTmx2jrhVgFvEpfwrS'
            }
        }).then(response => {
            console.log("Successfully sent message:", response);
        }).catch(error => {
            console.log("Error sending message:", error);
        });
    };
}

export const usersService = new UsersService();