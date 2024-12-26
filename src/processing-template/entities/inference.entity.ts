import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProcessingTemplate } from './processing-template.entity';
import { ContentExtraction } from './content-extraction.entity';

export enum ProcessingState {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ERROR = 'error'
}

@Entity('inferences')
export class Inference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // El rol ahora viene del template, pero podemos mantener una copia por razones históricas
  @Column()
  template_type: string;

  @Column('jsonb')
  processed_text: Record<string, string>;

  @Column({
    type: 'enum',
    enum: ProcessingState,
    default: ProcessingState.PENDING
  })
  processing_state: ProcessingState;

  @Column({ nullable: true })
  status_message: string;

  @Column('jsonb', { nullable: true })
  processing_metadata: {
    model_used: string;
    role: string;
    finish_reason: string;
    total_tokens: number;
    completion_tokens: number;
    prompt_tokens: number;
    completion_time?: Date;
  };

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => ProcessingTemplate, template => template.inferences)
  @JoinColumn({ name: 'template_id' })
  processing_template: ProcessingTemplate;

  @ManyToOne(() => ContentExtraction, contentExtraction => contentExtraction.inferences)
  @JoinColumn({ name: 'content_extraction_id' })
  content_extraction: ContentExtraction;
}
