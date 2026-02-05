import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private cloudinary: CloudinaryService,
    ) { }

    async update(id: string, updateUserDto: UpdateUserDto) {
        console.log(`Actualizando usuario ${id}:`, updateUserDto);
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                pushToken: true,
                lat: true,
                lng: true,
                role: true,
            }
        });
    }

    async updateAvatar(id: string, file: Express.Multer.File) {
        const result = await this.cloudinary.uploadFile(file);
        const avatarUrl = result.secure_url;

        return this.prisma.user.update({
            where: { id },
            data: { avatar: avatarUrl },
            select: {
                id: true,
                avatar: true,
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
                avatar: true,
                pushToken: true,
                lat: true,
                lng: true,
                role: true,
            }
        });
    }
}

