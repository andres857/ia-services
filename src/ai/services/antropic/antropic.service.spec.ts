import { Test, TestingModule } from '@nestjs/testing';
import { AntropicService } from './antropic.service';

describe('AntropicService', () => {
  let service: AntropicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AntropicService],
    }).compile();

    service = module.get<AntropicService>(AntropicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
