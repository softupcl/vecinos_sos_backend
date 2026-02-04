import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum ContactCategory {
    GENERAL = 'GENERAL',
    PERSONAL = 'PERSONAL',
}

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsEnum(ContactCategory)
    @IsOptional()
    category?: ContactCategory;
}
