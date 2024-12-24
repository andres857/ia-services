import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KalmSystemController } from './kalm-system.controller';
import { KalmSystemService } from './kalm-system.service';

import { CustomerKalmSystem } from './entities/customer.entity';


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
        entities: [__dirname + '/**/*.entity{.ts,.js}'], 
        // entities: [CustomerKalmSystem], // Busca entidades en este módulo
        // Busca entidades en este módulo
        synchronize: false, // En producción siempre false
        logging: true,
      }),
    }),
    TypeOrmModule.forFeature([CustomerKalmSystem], 'kalm'),
  ],
  controllers: [KalmSystemController],
  providers: [KalmSystemService],
  exports: [KalmSystemService]
})
export class KalmSystemModule {}
