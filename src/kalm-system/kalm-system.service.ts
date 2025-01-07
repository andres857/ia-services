import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CustomerKalmSystem } from './entities/customer.entity';
import { ClubKalmSystem } from './entities/club.entity';
import { ContentVideoKalmSystem } from './entities/content_video.entity';
import { ContentImageKalmSystem } from './entities/content_image.entity';
import { ImagesKalmSystem } from './entities/images.entity';
import { ContentsKalmSystem } from './entities/contents.entity';

@Injectable()
export class KalmSystemService {
    constructor(
        @InjectRepository(CustomerKalmSystem, 'kalm')
        private readonly customerRepository: Repository<CustomerKalmSystem>,
        @InjectRepository(ClubKalmSystem, 'kalm')
        private readonly clubRepository: Repository<ClubKalmSystem>,
        @InjectRepository(ContentVideoKalmSystem, 'kalm')
        private readonly contentVideoRepository: Repository<ContentVideoKalmSystem>,
        @InjectRepository(ContentImageKalmSystem, 'kalm')
        private readonly contentImageRepository: Repository<ContentImageKalmSystem>,
        @InjectRepository(ImagesKalmSystem, 'kalm')
        private readonly imagesRepository: Repository<ImagesKalmSystem>,
        @InjectRepository(ContentsKalmSystem, 'kalm')
        private readonly contentsRepository: Repository<ContentsKalmSystem>,
    ) {}

    async getAllCustomers() {
        return await this.customerRepository.find();
    }

    async getCustomerById(id: number) {
        return await this.customerRepository.findOne({ where: { id } });
    }

    async getCustomerClubs(customerId: number) {
        return await this.clubRepository.find({ where: { client_id: customerId } });
    }

    async getContentVideosByClubId(clubId: number) {
        const ID_CONTENT_TYPE_VIDEO = 2;
        return await this.contentVideoRepository.find({ 
            where: { 
                content_type_id: ID_CONTENT_TYPE_VIDEO, 
                club_id: clubId 
            }
        });
    }

    async buildUrlContentVideo(idCustomer: number, idContent: number) {
        console.log('lo');
        
        try {
            const customer = await this.customerRepository.findOne({ where: { id: idCustomer } });
            if (!customer) {                
                throw new NotFoundException(
                    `No se encontró el cliente con ID ${idCustomer}`
                );
            }
            console.log('customer', customer);
            const urlComplete = `https://${customer.urlPortal}/${customer.name}/storage/`;
            const image_id = await this.contentImageRepository.findOne({ where: { content_id: idContent } });
            if (!image_id) {
                console.log('no hayyyyyyyyyyyyyyy1');
                return null;
            }
            console.log('hereeeeee', image_id);
            const image = await this.imagesRepository.findOne({ where: { id: image_id.id } });
            if (image?.name){
                if (URL.canParse(`${urlComplete}${image.name}`)) {
                    const url = new URL(`${urlComplete}${image.name}`);
                    return url;
                } else {
                    throw new Error('URL inválida');
                }
            }
            console.log('no hayyyyyyyyyyyyyyy');
            return null;
        } catch (error) {
            console.error('Error en el proceso de construcción de la URL del video', error);
            throw error;
        }
    }

    async buildUrlsContentVideoByIdCustomer(customerId: number) {
        const ID_CONTENT_TYPE_VIDEO = 2;
        try {
            const customer = await this.customerRepository.findOne({ where: { id: customerId } });
            if (!customer) {
                return null;
            }
    
            const urlComplete = `${customer.name}/storage/`;        
            const clubs = await this.clubRepository.find({ where: { client_id: customerId } });
            
            const urlsVideos = await Promise.all(clubs.map(async (club) => {
                try {
                    const contentsTypeVideo = await this.contentsRepository.find({ 
                        where: { 
                            club_id: club.id,
                            content_type_id: ID_CONTENT_TYPE_VIDEO
                        }
                    });
                    if (contentsTypeVideo.length > 0) {
                        const urlsVideos = await Promise.all(contentsTypeVideo.map(async (content) => {
                            
                            const image_id = await this.contentImageRepository.findOne({ where: { content_id: content.id } });
                            if (!image_id) {
                                return null;
                            }
                            const image = await this.imagesRepository.findOne({ where: { id: image_id.id } });                                 
                            if (image?.type === 'video/mp4') {
                                image.name = urlComplete + image.name;
                                return {
                                    id: image.id,
                                    name: image.name,
                                }
                            }
                            return null;
                        }));
                        const filteredVideos = urlsVideos.filter(url => url !== null);
                        return filteredVideos;
                    }
                    return null;
                } catch (error) {
                    console.error(`Error in the process build urls videos for the club ${club.id}`);
                    return null;
                }
    
            }));
            const filteredVideos = urlsVideos.filter(url => url !== null);
            return filteredVideos.flat();
        } catch (error) {
            // console.error(`Error in the process build urls videos for the club ${club.id}`);
            throw new Error('Error obteniendo la informacion del cliente');
        }
    }
}