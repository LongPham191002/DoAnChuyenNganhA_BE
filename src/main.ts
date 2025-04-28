import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ⚠️ Bật CORS để FE truy cập được BE
  app.enableCors({
    origin: 'http://localhost:4200', // Cho phép FE gọi API
    credentials: true, // Nếu có sử dụng cookie, token
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
