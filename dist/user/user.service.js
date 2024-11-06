"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const firebaseAdmin = require("firebase-admin");
const axios_1 = require("axios");
let UserService = class UserService {
    async registerUser(registerUser) {
        console.log(registerUser);
        try {
            const userRecord = await firebaseAdmin.auth().createUser({
                displayName: registerUser.firstName,
                email: registerUser.email,
                password: registerUser.password,
            });
            console.log('User Record:', userRecord);
            return userRecord;
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw new Error('User registration failed');
        }
    }
    async loginUser(payload) {
        const { email, password } = payload;
        try {
            const { idToken, refreshToken, expiresIn } = await this.signInWithEmailAndPassword(email, password);
            return { idToken, refreshToken, expiresIn };
        }
        catch (error) {
            if (error.message.includes('EMAIL_NOT_FOUND')) {
                throw new Error('User not found.');
            }
            else if (error.message.includes('INVALID_PASSWORD')) {
                throw new Error('Invalid password.');
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    async signInWithEmailAndPassword(email, password) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.APIKEY}`;
        return await this.sendPostRequest(url, {
            email,
            password,
            returnSecureToken: true,
        });
    }
    async sendPostRequest(url, data) {
        try {
            const response = await axios_1.default.post(url, data, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        }
        catch (error) {
            console.log('error', error);
        }
    }
    async validateRequest(req) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            console.log('Authorization header not provided.');
            return false;
        }
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            console.log('Invalid authorization format. Expected "Bearer <token>".');
            return false;
        }
        try {
            const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
            console.log('Decoded Token:', decodedToken);
            return true;
        }
        catch (error) {
            if (error.code === 'auth/id-token-expired') {
                console.error('Token has expired.');
            }
            else if (error.code === 'auth/invalid-id-token') {
                console.error('Invalid ID token provided.');
            }
            else {
                console.error('Error verifying token:', error);
            }
            return false;
        }
    }
    create(createUserDto) {
        return 'This action adds a new user';
    }
    findAll() {
        return `This action returns all user`;
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map