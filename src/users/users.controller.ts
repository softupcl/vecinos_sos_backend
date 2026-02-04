import { Controller, Get, Body, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import type { User } from '@prisma/client';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('profile')
    getProfile(@GetUser() user: User) {
        return this.usersService.getProfile(user.id);
    }

    @Patch('profile')
    update(@GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(user.id, updateUserDto);
    }
}
