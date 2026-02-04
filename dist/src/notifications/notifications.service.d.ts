export declare class NotificationsService {
    private readonly logger;
    private readonly EXPO_PUSH_URL;
    sendPushNotification(tokens: string[], title: string, body: string, data?: any): Promise<any>;
}
