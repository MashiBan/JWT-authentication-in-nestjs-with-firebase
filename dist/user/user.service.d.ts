import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class UserService {
    registerUser(registerUser: RegisterUserDto): Promise<import("firebase-admin/lib/auth/user-record").UserRecord>;
    loginUser(payload: LoginDto): Promise<{
        idToken: any;
        refreshToken: any;
        expiresIn: any;
    }>;
    private signInWithEmailAndPassword;
    private sendPostRequest;
    validateRequest(req: any): Promise<boolean>;
    create(createUserDto: CreateUserDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
