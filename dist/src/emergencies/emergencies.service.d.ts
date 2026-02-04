import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { User } from '@prisma/client';
export declare class EmergenciesService {
    private prisma;
    private notificationsService;
    private readonly logger;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    create(createEmergencyDto: CreateEmergencyDto, sender: User): Promise<{
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
    private getDistanceFromLatLonInKm;
    private deg2rad;
}
