import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';

let cachedApp: any;

async function bootstrap() {
  if (cachedApp) return cachedApp;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Vercel handles the server start, so we only listen locally
  if (process.env.NODE_ENV !== 'production') {
    await app.listen(process.env.PORT ?? 3000);
  }

  await app.init();
  cachedApp = app.getHttpAdapter().getInstance();
  return cachedApp;
}

// Exportar el handler para Vercel
export default async (req: any, res: any) => {
  const app = await bootstrap();
  return app(req, res);
};

