import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '@prisma/client';

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) { }

    @Post()
    create(@Body() createContactDto: CreateContactDto, @GetUser() user: User) {
        return this.contactsService.create(createContactDto, user);
    }

    @Get()
    findAll(@GetUser() user: User) {
        return this.contactsService.findAll(user);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @GetUser() user: User) {
        return this.contactsService.findOne(id, user);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateContactDto: UpdateContactDto,
        @GetUser() user: User
    ) {
        return this.contactsService.update(id, updateContactDto, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @GetUser() user: User) {
        return this.contactsService.remove(id, user);
    }
}
