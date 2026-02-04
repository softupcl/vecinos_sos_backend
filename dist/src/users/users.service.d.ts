import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        name: string | null;
        email: string;
        pushToken: string | null;
        lat: number | null;
        lng: number | null;
        role: import("@prisma/client").$Enums.Role;
    }>;
    getProfile(id: string): Promise<{
        id: string;
        name: string | null;
        email: string;
        pushToken: string | null;
        lat: number | null;
        lng: number | null;
        role: import("@prisma/client").$Enums.Role;
    } | null>;
}
