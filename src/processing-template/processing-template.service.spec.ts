import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingTemplateService } from './processing-template.service';

describe('ProcessingTemplateService', () => {
  let service: ProcessingTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessingTemplateService],
    }).compile();

    service = module.get<ProcessingTemplateService>(ProcessingTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
