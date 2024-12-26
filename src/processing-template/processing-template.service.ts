// src/processing-templates/processing-templates.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessingTemplate } from './entities/processing-template.entity';

import { CreateProcessingTemplateDto } from './dtos/create-processing-template.dto';
import { UpdateProcessingTemplateDto } from './dtos/update-processing-template.dto';

@Injectable()
export class ProcessingTemplatesService {
  constructor(
    @InjectRepository(ProcessingTemplate)
    private readonly templateRepository: Repository<ProcessingTemplate>,
  ) {}

  async create(createTemplateDto: CreateProcessingTemplateDto): Promise<ProcessingTemplate> {
    console.log('createTemplateDto SERVICE *************', createTemplateDto);
    
    const template = this.templateRepository.create(createTemplateDto);
    return await this.templateRepository.save(template);
  }

  async findAll(): Promise<ProcessingTemplate[]> {
    return await this.templateRepository.find();
  }

  async findOne(id: string): Promise<ProcessingTemplate> {
    const template = await this.templateRepository.findOne({ 
      where: { id },
      relations: ['inferences'] // Incluye las inferencias relacionadas si las necesitas
    });
    
    if (!template) {
      throw new NotFoundException(`Template with ID "${id}" not found`);
    }
    
    return template;
  }

  async update(id: string, updateTemplateDto: UpdateProcessingTemplateDto): Promise<ProcessingTemplate> {
    const template = await this.findOne(id);
    
    // Actualizamos solo los campos proporcionados
    Object.assign(template, updateTemplateDto);
    
    return await this.templateRepository.save(template);
  }

  async remove(id: string): Promise<void> {
    const result = await this.templateRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Template with ID "${id}" not found`);
    }
  }
}