import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Inference } from './inference.entity';

@Entity('processing_templates')
export class ProcessingTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  template_type: string;

  @Column('text')
  prompt_template: string;

  @Column({ nullable: true })
  description: string;

  // Podemos agregar campos adicionales útiles para la integración con LangChain
  @Column({ nullable: true })
  model_settings: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Inference, inference => inference.processing_template)
  inferences: Inference[];
}