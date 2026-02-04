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
var EmergenciesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmergenciesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let EmergenciesService = EmergenciesService_1 = class EmergenciesService {
    prisma;
    notificationsService;
    logger = new common_1.Logger(EmergenciesService_1.name);
    constructor(prisma, notificationsService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
    async create(createEmergencyDto, sender) {
        const { type, lat, lng, address } = createEmergencyDto;
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
        const RADIUS_KM = 2;
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
        const tokensToNotify = [];
        neighbors.forEach((neighbor) => {
            const distance = this.getDistanceFromLatLonInKm(lat, lng, neighbor.lat, neighbor.lng);
            if (distance <= RADIUS_KM) {
                tokensToNotify.push(neighbor.pushToken);
            }
        });
        if (tokensToNotify.length > 0) {
            const title = `¡Emergencia: ${type}!`;
            const body = `${sender.name || 'Un vecino'} necesita ayuda cerca de ${address || 'tu ubicación'}`;
            await this.notificationsService.sendPushNotification(tokensToNotify, title, body, {
                emergencyId: emergency.id,
                type,
                senderName: sender.name,
                lat,
                lng,
            });
            this.logger.log(`Se notificó a ${tokensToNotify.length} vecinos cercanos.`);
        }
        else {
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
    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) *
                Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
};
exports.EmergenciesService = EmergenciesService;
exports.EmergenciesService = EmergenciesService = EmergenciesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], EmergenciesService);
//# sourceMappingURL=emergencies.service.js.map