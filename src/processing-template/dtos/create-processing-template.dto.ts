import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProcessingTemplateDto {
  @IsString()
  @IsNotEmpty()
  template_type: string;

  @IsString()
  @IsNotEmpty()
  prompt_template: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  model_settings?: string;
}