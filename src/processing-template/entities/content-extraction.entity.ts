import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Inference } from './inference.entity';

export enum ExtractionState {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ERROR = 'error'
}

export enum ContentType {
  VIDEO = 'video',
  DOCUMENT = 'document',
  PDF = 'pdf'
}

// Interfaz para los metadatos de la extracción
interface ExtractionMetadata {
  characters?: number;
  words?: number;
  pages?: number;        // Para PDFs y documentos
  duration?: number;     // Para videos
  fileSize?: number;
  mimeType?: string;
}

// Interfaz para la tarea de extracción
interface ExtractionTask {
  state: ExtractionState;
  message: string;
  started_at?: Date;
  completed_at?: Date;
}

@Entity('content_extractions')
export class ContentExtraction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Campos de identificación del contenido
  @Column()
  ks_customer_id: number;

  @Column()
  ks_club_id: number;

  @Column()
  ks_content_id: number;

  // Información del contenido
  @Column({
    type: 'enum',
    enum: ContentType,
    default: ContentType.VIDEO
  })
  content_type: ContentType;

  @Column()
  resource_url: string;

  // Campos de extracción
  @Column({ type: 'text', nullable: true })
  extracted_text: string;

  // Estado y metadatos de la tarea
  @Column({
    type: 'jsonb',
    default: {
      state: ExtractionState.PENDING,
      message: ''
    }
  })
  task: ExtractionTask;

  @Column({ type: 'jsonb', nullable: true })
  metadata: ExtractionMetadata;

  // Campos de auditoría
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Inference, inference => inference.content_extraction)
  inferences: Inference[];
}
