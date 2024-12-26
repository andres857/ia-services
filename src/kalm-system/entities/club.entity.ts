import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity('clubs')
export class ClubKalmSystem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  client_id: number;
}