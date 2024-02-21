import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { petsService } from './pets.service';

describe('PetsService', () => {
    const mock = new MockAdapter(axios);
    const userId = 'testUserId';

    afterEach(() => {
        mock.reset();
    });

    describe('getPets', () => {
        it('should return pets on successful fetch', async () => {
            const data = { statusCode: 200, content: { pets: [{ id: '1', name: 'Rex' }] } };
            mock.onPost('http://192.168.1.14:3000/pets/getPets', { userId }).reply(200, data);

            const response = await petsService.getPets(userId);

            expect(response).toEqual(data);
        });

        it('should handle server response error', async () => {
            const errorResponse = { statusCode: 500, message: 'Erreur interne du serveur' };
            mock.onPost('http://192.168.1.14:3000/pets/getPets', { userId }).networkError();

            const response = await petsService.getPets(userId);

            expect(response).toEqual(errorResponse);
        });

        it('should handle timeout correctly', async () => {
            mock.onPost('http://192.168.1.14:3000/pets/getPets', { userId }).timeout();

            const response = await petsService.getPets(userId);

            expect(response).toEqual({"message": "Erreur interne du serveur", "statusCode": 500});
        });

        it('should handle unexpected errors correctly', async () => {
            mock.onPost('http://192.168.1.14:3000/pets/getPets', { userId }).reply(() => {
                throw new Error('Unexpected error');
            });
    
            const response = await petsService.getPets(userId);
    
            expect(response).toEqual({"message": "Erreur interne du serveur", "statusCode": 500});
        });
    });

    describe('createPet', () => {
        it('should return response on successful creation', async () => {
            const data = { statusCode: 200, message: 'Animal créé avec succès', content: { pet: { id: '1', name: 'Buddy', animal: 'Dog' } } };
            mock.onPost('http://192.168.1.14:3000/pets/create').reply(200, data);
    
            const response = await petsService.createPet(userId, 'Buddy', 'Dog', ['loyal', 'friendly'], ['fetch']);
    
            expect(response).toEqual(data);
        });
    
        it('should handle server response error', async () => {
            const errorResponse = { statusCode: 500, message: 'Erreur interne du serveur' };
            mock.onPost('http://192.168.1.14:3000/pets/create').networkError();
    
            const response = await petsService.createPet(userId, 'Buddy', 'Dog', ['loyal', 'friendly'], ['fetch']);
    
            expect(response).toEqual(errorResponse);
        });
    
        it('should handle timeout correctly', async () => {
            mock.onPost('http://192.168.1.14:3000/pets/create').timeout();
    
            const response = await petsService.createPet(userId, 'Buddy', 'Dog', ['loyal', 'friendly'], ['fetch']);
    
            expect(response).toEqual({"message": "Erreur interne du serveur", "statusCode": 500});
        });
    
        it('should handle unexpected errors correctly', async () => {
            mock.onPost('http://192.168.1.14:3000/pets/create').reply(() => {
                throw new Error('Unexpected error');
            });
    
            const response = await petsService.createPet(userId, 'Buddy', 'Dog', ['loyal', 'friendly'], ['fetch']);
    
            expect(response).toEqual({"message": "Erreur interne du serveur", "statusCode": 500});
        });
    });

    describe('getMessages', () => {
        it('should return messages on successful fetch', async () => {
            const data = { statusCode: 200, content: { threadId:"48459594", messages: [{ sender: 'Joe', Message: 'Yeet!' }] } };
            mock.onPost('http://192.168.1.14:3000/pets/getMessages').reply(200, data);
    
            const response = await petsService.getMessages('Rex', '123');
    
            expect(response).toEqual(data);
        });
    
        it('should handle server response error', async () => {
            const errorResponse = { statusCode: 500, message: 'Erreur interne du serveur' };
            mock.onPost('http://192.168.1.14:3000/pets/getMessages').networkError();
    
            const response = await petsService.getMessages('Rex', '123');
    
            expect(response).toEqual(errorResponse);
        });
    
        it('should handle timeout correctly', async () => {
            mock.onPost('http://192.168.1.14:3000/pets/getMessages').timeout();
    
            const response = await petsService.getMessages('Rex', '123');
    
            expect(response).toEqual({"message": "Erreur interne du serveur", "statusCode": 500});
        });
    
        it('should handle unexpected errors correctly', async () => {
            mock.onPost('http://192.168.1.14:3000/pets/getMessages').reply(() => {
                throw new Error('Unexpected error');
            });
    
            const response = await petsService.getMessages('Rex', '123');
    
            expect(response).toEqual({"message": "Erreur interne du serveur", "statusCode": 500});
        });
    });

    describe('sendMessage', () => {
        it('should return response on successful send', async () => {
            const data = { statusCode: 200, content: { message: 'Message sent successfully' } };
            mock.onPost('http://192.168.1.14:3000/pets/speak').reply(200, data);
    
            const response = await petsService.sendMessage('1', 'Hello, world!');
    
            expect(response).toEqual(data);
        });
    
        it('should handle server response error', async () => {
            const errorResponse = { statusCode: 500, message: 'Erreur interne du serveur' };
            mock.onPost('http://192.168.1.14:3000/pets/speak').networkError();
    
            const response = await petsService.sendMessage('1', 'Hello, world!');
    
            expect(response).toEqual(errorResponse);
        });
    
        it('should handle timeout correctly', async () => {
            mock.onPost('http://192.168.1.14:3000/pets/speak').timeout();
    
            const response = await petsService.sendMessage('1', 'Hello, world!');
    
            expect(response).toEqual({"message": "Erreur interne du serveur", "statusCode": 500});
        });
    
        it('should handle unexpected errors correctly', async () => {
            mock.onPost('http://192.168.1.14:3000/pets/speak').reply(() => {
                throw new Error('Unexpected error');
            });
    
            const response = await petsService.sendMessage('1', 'Hello, world!');
    
            expect(response).toEqual({"message": "Erreur interne du serveur", "statusCode": 500});
        });
    });
    
});