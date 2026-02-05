import { Controller, Get, Body, Patch, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import type { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

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

    @Post('avatar')
    @UseInterceptors(FileInterceptor('file'))
    uploadAvatar(@GetUser() user: User, @UploadedFile() file: Express.Multer.File) {
        return this.usersService.updateAvatar(user.id, file);
    }
}

