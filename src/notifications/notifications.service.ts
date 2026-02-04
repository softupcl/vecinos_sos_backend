import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
    private readonly logger = new Logger(NotificationsService.name);
    private readonly EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

    async sendPushNotification(tokens: string[], title: string, body: string, data: any = {}) {
        if (tokens.length === 0) return;

        const messages = tokens.map((token) => ({
            to: token,
            sound: 'default',
            title,
            body,
            data,
        }));

        try {
            const response = await fetch(this.EXPO_PUSH_URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messages),
            });

            const result = await response.json();
            this.logger.log(`Notificaciones enviadas. Respuesta de Expo: ${JSON.stringify(result)}`);
            return result;
        } catch (error) {
            this.logger.error(`Error enviando notificaciones: ${error.message}`);
            throw error;
        }
    }
}
