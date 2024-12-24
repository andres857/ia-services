import { Module } from '@nestjs/common';
import { VimeoService } from './services/vimeo/vimeo.service';
import { DoService } from './services/do/do.service';
import { VideoCdnController } from './video-cdn.controller';

@Module({
  providers: [VimeoService, DoService],
  controllers: [VideoCdnController]
})
export class VideoCdnModule {}
