import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KalmSystemModule } from './kalm-system/kalm-system.module';
import { AiModule } from './ai/ai.module';
import { VideoCdnModule } from './video-cdn/video-cdn.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { CustomerKalmSystem } from './kalm-system/entities/customer.entity';
import { ProcessingTemplateModule } from './processing-template/processing-template.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT', 5432),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + '/entities/*.entity{.ts,.js}'], // Solo entidades de PostgreSQL
        synchronize: true,
        logging: true,
        autoLoadEntities: true, // Carga automáticamente las entidades
        retryAttempts: 3, // Intentos de reconexión
        retryDelay: 3000, // Delay entre intentos en milisegundos
      }),
    }),
    KalmSystemModule, AiModule, VideoCdnModule, ProcessingTemplateModule,],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
