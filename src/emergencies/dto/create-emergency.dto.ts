import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEmergencyDto {
    @IsString()
    @IsNotEmpty({ message: 'El tipo de emergencia es obligatorio' })
    type: string;

    @IsNumber()
    @IsNotEmpty({ message: 'La latitud es obligatoria' })
    lat: number;

    @IsNumber()
    @IsNotEmpty({ message: 'La longitud es obligatoria' })
    lng: number;

    @IsString()
    @IsOptional()
    address?: string;
}
