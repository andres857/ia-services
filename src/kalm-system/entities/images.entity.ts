import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';

@Entity('images')
export class ImagesKalmSystem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 191 })
  name: string;

  @Column({ type: 'varchar', length: 191 })
  type: string;

  @Column({ type: 'int' })
  size: number;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}