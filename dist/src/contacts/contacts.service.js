"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ContactsService = class ContactsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createContactDto, user) {
        const { name, phone, email, category = client_1.ContactCategory.PERSONAL } = createContactDto;
        if (category === client_1.ContactCategory.GENERAL && user.role !== client_1.Role.ADMIN) {
            throw new common_1.UnauthorizedException('Solo los administradores pueden crear contactos generales');
        }
        return this.prisma.contact.create({
            data: {
                name,
                phone,
                email,
                category,
                userId: category === client_1.ContactCategory.PERSONAL ? user.id : null,
            },
        });
    }
    async findAll(user) {
        console.log(`Buscando contactos para el usuario: ${user.id} (${user.email})`);
        const contacts = await this.prisma.contact.findMany({
            where: {
                OR: [
                    { category: client_1.ContactCategory.GENERAL },
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
    async findOne(id, user) {
        const contact = await this.prisma.contact.findUnique({
            where: { id },
        });
        if (!contact) {
            throw new common_1.NotFoundException(`Contacto con ID ${id} no encontrado`);
        }
        if (contact.category === client_1.ContactCategory.PERSONAL && contact.userId !== user.id) {
            throw new common_1.UnauthorizedException('No tienes permiso para ver este contacto');
        }
        return contact;
    }
    async update(id, updateContactDto, user) {
        const contact = await this.findOne(id, user);
        if (contact.category === client_1.ContactCategory.GENERAL && user.role !== client_1.Role.ADMIN) {
            throw new common_1.UnauthorizedException('Solo los administradores pueden editar contactos generales');
        }
        return this.prisma.contact.update({
            where: { id },
            data: updateContactDto,
        });
    }
    async remove(id, user) {
        const contact = await this.findOne(id, user);
        if (contact.category === client_1.ContactCategory.GENERAL && user.role !== client_1.Role.ADMIN) {
            throw new common_1.UnauthorizedException('Solo los administradores pueden eliminar contactos generales');
        }
        return this.prisma.contact.delete({
            where: { id },
        });
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map