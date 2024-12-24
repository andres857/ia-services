import { Test, TestingModule } from '@nestjs/testing';
import { KalmSystemController } from './kalm-system.controller';

describe('KalmSystemController', () => {
  let controller: KalmSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KalmSystemController],
    }).compile();

    controller = module.get<KalmSystemController>(KalmSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
