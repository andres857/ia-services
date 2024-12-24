import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity('customers')
export class CustomerKalmSystem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'url_portal' })
  urlPortal: string;
}