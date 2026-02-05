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
        try {
            if (!file) {
                throw new Error('No se recibió ninguna imagen');
            }
            console.log('Iniciando subida a Cloudinary...', file.originalname);
            const result = await this.cloudinary.uploadFile(file);
            const avatarUrl = (result as any).secure_url;

            console.log('Subida exitosa, actualizando base de datos:', avatarUrl);
            return this.prisma.user.update({
                where: { id },
                data: { avatar: avatarUrl },
                select: {
                    id: true,
                    avatar: true,
                }
            });
        } catch (error) {
            console.error('Error en updateAvatar:', error);
            throw error;
        }
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

