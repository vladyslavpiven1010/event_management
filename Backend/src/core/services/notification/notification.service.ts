import { DataSource } from 'typeorm';
import { Event, Notification, NotificationTopic, User, UserNotification } from 'src/core/entities';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private notificationRepository;
  private userNotificationRepository;
  private userRepository;
  private eventRepository;
  private notificationTopicRepository;

  constructor(private dataSource: DataSource) {
    this.notificationRepository = this.dataSource.getRepository(Notification);
    this.userNotificationRepository =
      this.dataSource.getRepository(UserNotification);
    this.userRepository = this.dataSource.getRepository(User);
    this.eventRepository = this.dataSource.getRepository(Event);
    this.notificationTopicRepository = this.dataSource.getRepository(NotificationTopic);
  }

  async findOneById(id: number): Promise<Notification | undefined> {
    return await this.notificationRepository.findOne({ where: { id } });
  }

  async findNotificationForUser(
    userId: number,
    notificationId: number,
  ): Promise<UserNotification | undefined> {
    return this.userNotificationRepository.findOne({
      where: {
        user: { id: userId },
        notification: { id: notificationId },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.notificationRepository.delete(id);
  }

  async findAllByUser(userId: number): Promise<Notification[]> {
    const userNotifications = await this.userNotificationRepository.find({
        where: { user: { id: userId } },
        relations: ['notification', 'notification.topic'],
      });
  
      // Extract and return notifications
      return userNotifications.map((userNotification) => userNotification.notification);
  }

  /**
   * Send a notification to the user.
   * @param userId - The ID of the user receiving the notification.
   * @param message - The notification message.
   */
  async sendNotificationToUser(userId: number, message: string, topicId: number): Promise<void> {
    const topic = await this.notificationTopicRepository.findOne({ where: { id: topicId } });
    const notification = this.notificationRepository.create({
        title: "Notification",
        content: message,
        send_at: new Date(),
        topic: topic
      });
    
      const savedNotification = await this.notificationRepository.save(notification);
    
      await this.userNotificationRepository.save({
        notification: savedNotification,
        user: { id: userId },
        received_at: new Date()
      });
  }

  /**
   * Notify users about an event update.
   * @param eventId - The ID of the event being updated.
   * @param updateMessage - A message describing the update.
   */
  async notifyUsersOfEventUpdate(
    eventId: number,
    updateMessage: string,
  ): Promise<void> {
    const event = await this.eventRepository.findOne({
        where: { id: eventId },
        relations: ['user_id'],
    });

    const { companyId } = event.user_id;

    const companyUsers = await this.userRepository.find({
        where: { company_id: { id: companyId } },
    });

    await companyUsers.map((user) =>
        this.sendNotificationToUser(user.id, updateMessage, 1)
    );
  }
}