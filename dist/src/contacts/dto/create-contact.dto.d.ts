import { ContactCategory } from '@prisma/client';
export declare class CreateContactDto {
    name: string;
    phone: string;
    email?: string;
    category?: ContactCategory;
}
