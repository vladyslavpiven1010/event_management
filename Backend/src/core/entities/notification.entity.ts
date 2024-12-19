import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
  } from 'typeorm';
  import { NotificationTopic } from './notification-topic.entity';
  import { UserNotification } from './user-notification.entity';
  
  @Entity()
  export class Notification {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    content: string;
  
    @CreateDateColumn()
    send_at: Date;
  
    @ManyToOne(
      () => NotificationTopic,
      (notificationTopic) => notificationTopic.id,
      {
        onDelete: 'CASCADE',
        nullable: false,
      },
    )
    topic: NotificationTopic;
  
    @OneToMany(() => UserNotification, (userNotification) => userNotification.id)
    userNotifications: UserNotification[];
}
  