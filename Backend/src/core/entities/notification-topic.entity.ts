import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Notification } from './notification.entity'; // Doğru dosya yolunu kontrol edin
  
  @Entity()
  export class NotificationTopic {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ nullable: true })
    description: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    // Bir NotificationTopic birden fazla Notification'a sahiptir (One-to-Many ilişki)
    @OneToMany(() => Notification, (notification) => notification.id)
    notifications: Notification[];
  }
  