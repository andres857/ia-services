import { Injectable } from '@nestjs/common';
import { CustomerKalmSystem } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class KalmSystemService {
    constructor(
        @InjectRepository(CustomerKalmSystem, 'kalm')
        private readonly customerRepository: Repository<CustomerKalmSystem>,
    ) {}

    async getAllCustomers() {
        return this.customerRepository.find();
    }
}
