import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async update(id: string, updateUserDto: UpdateUserDto) {
        console.log(`Actualizando usuario ${id}:`, updateUserDto);
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
            select: {
                id: true,
                email: true,
                name: true,
                pushToken: true,
                lat: true,
                lng: true,
                role: true,
            }
        });
    }

    async getProfile(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                pushToken: true,
                lat: true,
                lng: true,
                role: true,
            }
        });
    }
}
