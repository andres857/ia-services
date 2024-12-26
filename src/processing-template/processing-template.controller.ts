import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ProcessingTemplatesService } from './processing-template.service'; 
import { CreateProcessingTemplateDto } from './dtos/create-processing-template.dto';
import { UpdateProcessingTemplateDto } from './dtos/update-processing-template.dto';
import { Post, Body } from '@nestjs/common';

@Controller('processing-template')
export class ProcessingTemplateController {
    constructor(private readonly processingTemplatesService: ProcessingTemplatesService) {}

    @Post()
    create(@Body() createTemplateDto: CreateProcessingTemplateDto) {
        return this.processingTemplatesService.create(createTemplateDto);
    }

    @Get()
    findAll() {
        return this.processingTemplatesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.processingTemplatesService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTemplateDto: UpdateProcessingTemplateDto) {
        return this.processingTemplatesService.update(id, updateTemplateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.processingTemplatesService.remove(id);
    }
}