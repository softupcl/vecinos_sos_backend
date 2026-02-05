import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    pushToken?: string;

    @IsNumber()
    @IsOptional()
    lat?: number;

    @IsNumber()
    @IsOptional()
    lng?: number;

    @IsString()
    @IsOptional()
    avatar?: string;

}
