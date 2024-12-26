import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KalmSystemController } from './kalm-system.controller';
import { KalmSystemService } from './kalm-system.service';

import { CustomerKalmSystem } from './entities/customer.entity';
import { ClubKalmSystem } from './entities/club.entity';
import { ContentVideoKalmSystem } from './entities/content_video.entity';
import { ContentImageKalmSystem } from './entities/content_image.entity';
import { ImagesKalmSystem } from './entities/images.entity';
import { ContentsKalmSystem } from './entities/contents.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importamos ConfigModule para usar variables de entorno
      inject: [ConfigService],
      name: 'kalm', // Este nombre es importante - lo usaremos para identificar la conexión
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [CustomerKalmSystem, ClubKalmSystem, ContentVideoKalmSystem, ContentImageKalmSystem, ImagesKalmSystem, ContentsKalmSystem], 
        synchronize: false, // En producción siempre false
        logging: true,
      }),
    }),
    TypeOrmModule.forFeature([CustomerKalmSystem, ClubKalmSystem, ContentVideoKalmSystem, ContentImageKalmSystem, ImagesKalmSystem, ContentsKalmSystem], 'kalm'),
  ],
  controllers: [KalmSystemController],
  providers: [KalmSystemService],
  exports: [KalmSystemService]
})
export class KalmSystemModule {}
