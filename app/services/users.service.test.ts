import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { usersService } from './users.service';

describe('UsersService', () => {
    const mock = new MockAdapter(axios);

    describe('logIn', () => {
        it('should return response on successful login', async () => {
            const credentials = { email: 'testUser', password: 'testPass' };
            const data = { statusCode: 200, message: 'Connexion réussie', content: { authToken: 'authToken', refreshToken: 'refreshToken', user:{ email:"testUser", password:'opkorekgrgererg'} } };
            mock.onPost('http://10.13.15.140:3000/users/login', credentials).reply(200, data);
    
            const response = await usersService.logIn(credentials);
    
            expect(response).toEqual(data);
        });
    
        it('should handle server response error', async () => {
            const credentials = { email: 'testUser', password: 'testPass' };
            const errorResponse = { statusCode: 500, message: 'Erreur interne du serveur' };
            mock.onPost('http://10.13.15.140:3000/users/login', credentials).networkError();
    
            const response = await usersService.logIn(credentials);
    
            expect(response).toEqual(errorResponse);
        });
    
        it('should handle timeout correctly', async () => {
            const credentials = { email: 'testUser', password: 'testPass' };
            mock.onPost('http://10.13.15.140:3000/users/login', credentials).timeout();
    
            const response = await usersService.logIn(credentials);
    
            expect(response).toEqual({"message": "Erreur interne du serveur", "statusCode": 500});
        });
    
        it('should handle unexpected errors correctly', async () => {
            const credentials = { email: 'testUser', password: 'testPass' };
            mock.onPost('http://10.13.15.140:3000/users/login', credentials).reply(() => {
                throw new Error('Unexpected error');
            });
    
            const response = await usersService.logIn(credentials);
    
            expect(response).toEqual({"message": "Erreur interne du serveur", "statusCode": 500});
        });
    });
    
    describe('signUp', () => {
        it('should return response on successful signup', async () => {
            const credentials = { email: 'test@example.com', password: 'newPass', passwordConfirm: 'newPass' };
            const data = { statusCode: 200, content: { message: 'Votre compte a été créer' } };
            mock.onPost('http://10.13.15.140:3000/users/signup', credentials).reply(200, data);
    
            const response = await usersService.signUp(credentials);
    
            expect(response).toEqual(data);
        });
    
        it('should handle server response error', async () => {
            const credentials = { username: 'newUser', password: 'newPass', email: 'test@example.com' };
            const errorResponse = { statusCode: 500, message: 'Erreur interne du serveur' };
            mock.onPost('http://10.13.15.140:3000/users/signup', credentials).networkError();
    
            const response = await usersService.signUp(credentials);
    
            expect(response).toEqual(errorResponse);
        });
    
        it('should handle timeout correctly', async () => {
            const credentials = { username: 'newUser', password: 'newPass', email: 'test@example.com' };
            mock.onPost('http://10.13.15.140:3000/users/signup', credentials).timeout();
    
            const response = await usersService.signUp(credentials);
    
            expect(response).toEqual({"message": "Erreur interne du serveur", "statusCode": 500});
        });
    
        it('should handle unexpected errors correctly', async () => {
            const credentials = { username: 'newUser', password: 'newPass', email: 'test@example.com' };
            mock.onPost('http://10.13.15.140:3000/users/signup', credentials).reply(() => {
                throw new Error('Unexpected error');
            });
    
            const response = await usersService.signUp(credentials);
    
            expect(response).toEqual({"message": "Erreur interne du serveur", "statusCode": 500});
        });
    });
    

});