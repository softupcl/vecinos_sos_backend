import { Controller, Post, Body, Get, UseGuards, Patch, Param } from '@nestjs/common';
import { EmergenciesService } from './emergencies.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import type { User } from '@prisma/client';

@Controller('emergencies')
@UseGuards(JwtAuthGuard)
export class EmergenciesController {
    constructor(private readonly emergenciesService: EmergenciesService) { }

    @Post()
    create(
        @Body() createEmergencyDto: CreateEmergencyDto,
        @GetUser() user: User
    ) {
        return this.emergenciesService.create(createEmergencyDto, user);
    }

    @Get()
    findAll() {
        return this.emergenciesService.findAll();
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateDto: { status: any }
    ) {
        return this.emergenciesService.update(id, updateDto);
    }
}

