import { Injectable, Inject } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
    constructor(@Inject('CLOUDINARY') private cloudinaryProvider: any) { }

    async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream((error, result) => {
                if (error) {
                    console.error('Cloudinary stream error:', error);
                    return reject(error);
                }
                if (!result) {
                    return reject(new Error('Cloudinary upload failed: no result'));
                }
                resolve(result);
            });

            const stream = new Readable();
            stream.push(file.buffer);
            stream.push(null);
            stream.pipe(upload);
        });
    }
}

