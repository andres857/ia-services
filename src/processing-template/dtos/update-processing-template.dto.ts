import { PartialType } from '@nestjs/mapped-types';
import { CreateProcessingTemplateDto } from './create-processing-template.dto';

export class UpdateProcessingTemplateDto extends PartialType(CreateProcessingTemplateDto) {}