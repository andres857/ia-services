import { Module } from '@nestjs/common';
import { ProcessingTemplatesService } from './processing-template.service';
import { ProcessingTemplateController } from './processing-template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessingTemplate } from './entities/processing-template.entity';
import { Inference } from './entities/inference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessingTemplate, Inference])],
  providers: [ProcessingTemplatesService],
  controllers: [ProcessingTemplateController]
  })
export class ProcessingTemplateModule {}
