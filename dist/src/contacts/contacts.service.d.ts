import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { User } from '@prisma/client';
export declare class ContactsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createContactDto: CreateContactDto, user: User): Promise<{
        id: string;
        name: string;
        phone: string;
        email: string | null;
        category: import("@prisma/client").$Enums.ContactCategory;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(user: User): Promise<{
        id: string;
        name: string;
        phone: string;
        email: string | null;
        category: import("@prisma/client").$Enums.ContactCategory;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string, user: User): Promise<{
        id: string;
        name: string;
        phone: string;
        email: string | null;
        category: import("@prisma/client").$Enums.ContactCategory;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateContactDto: UpdateContactDto, user: User): Promise<{
        id: string;
        name: string;
        phone: string;
        email: string | null;
        category: import("@prisma/client").$Enums.ContactCategory;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, user: User): Promise<{
        id: string;
        name: string;
        phone: string;
        email: string | null;
        category: import("@prisma/client").$Enums.ContactCategory;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
