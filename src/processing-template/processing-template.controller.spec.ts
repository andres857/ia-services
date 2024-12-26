import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingTemplateController } from './processing-template.controller';

describe('ProcessingTemplateController', () => {
  let controller: ProcessingTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessingTemplateController],
    }).compile();

    controller = module.get<ProcessingTemplateController>(ProcessingTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
