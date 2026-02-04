import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ContactCategory } from '../../common/enums';

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
