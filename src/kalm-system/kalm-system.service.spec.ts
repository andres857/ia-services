import { Test, TestingModule } from '@nestjs/testing';
import { KalmSystemService } from './kalm-system.service';

describe('KalmSystemService', () => {
  let service: KalmSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KalmSystemService],
    }).compile();

    service = module.get<KalmSystemService>(KalmSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
