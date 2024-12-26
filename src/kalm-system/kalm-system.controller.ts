import { Controller, Get, Param } from '@nestjs/common';
import { KalmSystemService } from './kalm-system.service';

@Controller('kalm-system')
export class KalmSystemController {
    constructor(private readonly kalmsystemService: KalmSystemService) {}

    @Get('customers')
    getAllCustomers() {
        return this.kalmsystemService.getAllCustomers();
    }

    @Get('customers/:id')
    getCustomerById(@Param('id') id: number) {
        return this.kalmsystemService.getCustomerById(id);
    }

    @Get('customers/:id/clubs')
    getCustomerClubs(@Param('id') id: number) {
        return this.kalmsystemService.getCustomerClubs(id);
    }

    @Get('clubs/:id/contents')
    getContentVideosByClubId(@Param('id') id: number) {
        return this.kalmsystemService.getContentVideosByClubId(id);
    }

    @Get('customers/:idCustomer/contents/:idContent')
    getContentImage(@Param('idCustomer') idCustomer: number, @Param('idContent') idContent: number) {
        return this.kalmsystemService.buildUrlContentVideo(idCustomer, idContent);
    }

    @Get('customers/:id/clubs/contents')
    getUrlsContentVideoByIdCustomer(@Param('id') id: number) {
        return this.kalmsystemService.buildUrlsContentVideoByIdCustomer(id);
    }
}
