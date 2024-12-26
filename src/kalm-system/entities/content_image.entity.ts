import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity('content_images')
export class ContentImageKalmSystem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image_id: number;

  @Column()
  content_id: number;
}