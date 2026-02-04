import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { User, ContactCategory, Role } from '@prisma/client';

@Injectable()
export class ContactsService {
    constructor(private prisma: PrismaService) { }

    async create(createContactDto: CreateContactDto, user: User) {
        const { name, phone, email, category = ContactCategory.PERSONAL } = createContactDto;

        // Solo los administradores pueden crear contactos generales
        if (category === ContactCategory.GENERAL && user.role !== Role.ADMIN) {
            throw new UnauthorizedException('Solo los administradores pueden crear contactos generales');
        }

        return this.prisma.contact.create({
            data: {
                name,
                phone,
                email,
                category,
                userId: category === ContactCategory.PERSONAL ? user.id : null,
            },
        });
    }

    async findAll(user: User) {
        console.log(`Buscando contactos para el usuario: ${user.id} (${user.email})`);
        const contacts = await this.prisma.contact.findMany({
            where: {
                OR: [
                    { category: ContactCategory.GENERAL },
                    { userId: user.id },
                ],
            },
            orderBy: {
                name: 'asc',
            },
        });
        console.log(`Encontrados ${contacts.length} contactos.`);
        return contacts;
    }

    async findOne(id: string, user: User) {
        const contact = await this.prisma.contact.findUnique({
            where: { id },
        });

        if (!contact) {
            throw new NotFoundException(`Contacto con ID ${id} no encontrado`);
        }

        if (contact.category === ContactCategory.PERSONAL && contact.userId !== user.id) {
            throw new UnauthorizedException('No tienes permiso para ver este contacto');
        }

        return contact;
    }

    async update(id: string, updateContactDto: UpdateContactDto, user: User) {
        const contact = await this.findOne(id, user);

        // Si es un contacto general, solo un admin puede editarlo
        if (contact.category === ContactCategory.GENERAL && user.role !== Role.ADMIN) {
            throw new UnauthorizedException('Solo los administradores pueden editar contactos generales');
        }

        return this.prisma.contact.update({
            where: { id },
            data: updateContactDto,
        });
    }

    async remove(id: string, user: User) {
        const contact = await this.findOne(id, user);

        // Si es un contacto general, solo un admin puede eliminarlo
        if (contact.category === ContactCategory.GENERAL && user.role !== Role.ADMIN) {
            throw new UnauthorizedException('Solo los administradores pueden eliminar contactos generales');
        }

        return this.prisma.contact.delete({
            where: { id },
        });
    }
}
