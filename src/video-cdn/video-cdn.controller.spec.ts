import { Test, TestingModule } from '@nestjs/testing';
import { VideoCdnController } from './video-cdn.controller';

describe('VideoCdnController', () => {
  let controller: VideoCdnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoCdnController],
    }).compile();

    controller = module.get<VideoCdnController>(VideoCdnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
