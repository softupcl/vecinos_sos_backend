import { EmergenciesService } from './emergencies.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { User } from '@prisma/client';
export declare class EmergenciesController {
    private readonly emergenciesService;
    constructor(emergenciesService: EmergenciesService);
    create(createEmergencyDto: CreateEmergencyDto, user: User): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        lat: number;
        lng: number;
        type: string;
        address: string | null;
        status: import("@prisma/client").$Enums.EmergencyStatus;
        senderId: string;
    }>;
    findAll(): Promise<({
        sender: {
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        lat: number;
        lng: number;
        type: string;
        address: string | null;
        status: import("@prisma/client").$Enums.EmergencyStatus;
        senderId: string;
    })[]>;
}
