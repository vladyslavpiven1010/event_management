import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Notification } from './notification.entity';
  import { User } from './user.entity';
  
  @Entity()
  export class UserNotification {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    received_at: Date;
  
    @Column({ default: false })
    is_seen: boolean;
  
    @ManyToOne(
      () => Notification,
      (notification) => notification.userNotifications, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    )
    @JoinColumn({ name: 'notification_id' })
    notification: Notification;
  
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user: User;
  }
  