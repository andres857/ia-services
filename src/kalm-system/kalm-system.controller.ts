import { Controller, Get } from '@nestjs/common';
import { KalmSystemService } from './kalm-system.service';

@Controller('kalm-system')
export class KalmSystemController {
    constructor(private readonly kalmsystemService: KalmSystemService) {}

    @Get('customers')
    getAllCustomers() {
        return this.kalmsystemService.getAllCustomers();
    }
}
