import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { ContentExtraction } from '../../processing-template/entities/content-extraction.entity';

@Entity('customer_quotas')
export class CustomerQuota {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ks_customer_id: number;

  @Column({ default: 0 })
  used_tokens: number;

  @Column({ default: 1000000 })
  limit_tokens: number;

  @Column({ default: false })
  is_processing: boolean;

  // Agregamos información sobre el modelo LLM
  @Column('jsonb')
  llm_configuration: {
    model_name: string;      
    model_version: string;   
    provider: string;        
    max_tokens: number;      
    temperature: number;     
  };

  // Relación con ContentExtraction
  @OneToMany(() => ContentExtraction, extraction => extraction.customer_quota)
  content_extractions: ContentExtraction[];
}

