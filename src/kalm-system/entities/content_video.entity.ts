import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity('contents')
export class ContentVideoKalmSystem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content_type_id: number;

  @Column()
  club_id: number;
}