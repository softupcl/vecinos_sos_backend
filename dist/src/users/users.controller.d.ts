import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(user: User): Promise<{
        id: string;
        name: string | null;
        email: string;
        pushToken: string | null;
        lat: number | null;
        lng: number | null;
        role: import("@prisma/client").$Enums.Role;
    } | null>;
    update(user: User, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        name: string | null;
        email: string;
        pushToken: string | null;
        lat: number | null;
        lng: number | null;
        role: import("@prisma/client").$Enums.Role;
    }>;
}
