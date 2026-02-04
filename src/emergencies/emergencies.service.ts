import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import type { User } from '@prisma/client';

@Injectable()
export class EmergenciesService {
    private readonly logger = new Logger(EmergenciesService.name);

    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService,
    ) { }

    async create(createEmergencyDto: CreateEmergencyDto, sender: User) {
        const { type, lat, lng, address } = createEmergencyDto;

        // 1. Guardar la emergencia en la DB
        const emergency = await this.prisma.emergency.create({
            data: {
                type,
                lat,
                lng,
                address,
                senderId: sender.id,
            },
        });

        this.logger.log(`Emergencia creada por ${sender.name} (${sender.email}) - Tipo: ${type}`);

        // 2. Buscar vecinos cercanos con Push Token
        const RADIUS_KM = 100; // Radio de búsqueda (por ejemplo, 100km para pruebas)

        // Obtenemos usuarios que tengan token y posición, excluyendo al emisor
        const neighbors = await this.prisma.user.findMany({
            where: {
                pushToken: { not: null },
                lat: { not: null },
                lng: { not: null },
                id: { not: sender.id },
            },
            select: {
                id: true,
                pushToken: true,
                lat: true,
                lng: true,
                name: true,
            },
        });

        const tokensToNotify: string[] = [];

        neighbors.forEach((neighbor: { id: string, pushToken: string, lat: number, lng: number, name: string | null }) => {
            const distance = this.getDistanceFromLatLonInKm(
                lat,
                lng,
                neighbor.lat!,
                neighbor.lng!,
            );

            if (distance <= RADIUS_KM) {
                tokensToNotify.push(neighbor.pushToken!);
            }
        });

        // 3. Enviar notificaciones si hay vecinos cerca
        if (tokensToNotify.length > 0) {
            const title = `¡Emergencia: ${type}!`;
            const body = `${sender.name || 'Un vecino'} necesita ayuda cerca de ${address || 'tu ubicación'}`;

            await this.notificationsService.sendPushNotification(
                tokensToNotify,
                title,
                body,
                {
                    emergencyId: emergency.id,
                    type,
                    senderName: sender.name,
                    lat,
                    lng,
                }
            );

            this.logger.log(`Se notificó a ${tokensToNotify.length} vecinos cercanos.`);
        } else {
            this.logger.log('No se encontraron vecinos cerca para notificar.');
        }

        return emergency;
    }

    async findAll() {
        return this.prisma.emergency.findMany({
            include: {
                sender: {
                    select: {
                        name: true,
                        email: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async update(id: string, updateEmergencyDto: { status: any }) {
        return this.prisma.emergency.update({
            where: { id },
            data: updateEmergencyDto,
        });
    }

    // Fórmula de Haversine para calcular distancia en KM
    private getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 6371; // Radio de la Tierra en km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) *
            Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private deg2rad(deg: number) {
        return deg * (Math.PI / 180);
    }
}
