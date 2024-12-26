import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProcessingTemplate } from './processing-template.entity';

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

  @Column('uuid')
  video_transcription_id: string;

  // Actualizamos la relación para reflejar el nuevo nombre
  @ManyToOne(() => ProcessingTemplate, template => template.inferences)
  @JoinColumn({ name: 'template_id' })
  processing_template: ProcessingTemplate;

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
}