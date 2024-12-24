import { Test, TestingModule } from '@nestjs/testing';
import { DoService } from './do.service';

describe('DoService', () => {
  let service: DoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoService],
    }).compile();

    service = module.get<DoService>(DoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
