import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    registerUser(registerUserDTo: RegisterUserDto): Promise<import("firebase-admin/lib/auth/user-record").UserRecord>;
    login(loginDto: LoginDto): Promise<{
        idToken: any;
        refreshToken: any;
        expiresIn: any;
    }>;
    create(createUserDto: CreateUserDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
