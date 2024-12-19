import {
    Controller,
    Delete,
    Param,
    Req,
    NotFoundException,
    UseGuards,
  } from '@nestjs/common';
  import { JwtAuthGuard } from 'src/core/jwt-auth.guard';
  import { NotificationService } from 'src/core/services';
  import { BadRequestException, Get } from '@nestjs/common';
  import { EventService } from 'src/core/services';
  
  @Controller('notification')
  @UseGuards(JwtAuthGuard)
  export class NotificationController {
    constructor(private readonly notificationService: NotificationService, private eventService: EventService) {}
    @Get()
    async getAllNotifications(@Req() request: any): Promise<any> {
      const notifications = await this.notificationService.findAllByUser(
        request.user.sub,
      );
      return notifications;
    }
  
    @Get('all_own')
    async viewNotificationHistory(@Req() request: any): Promise<any> {
        await this.eventService.notifyUserAboutMostFrequentCategoryEvents(request.user.sub);
        const userNotifications = await this.notificationService.findAllByUser(
            request.user.sub,
        );
        
        return userNotifications;
    }
  
    @Delete(':id')
    async deleteNotification(
      @Req() request: any,
      @Param('id') id: number,
    ): Promise<any> {
      const notification = await this.notificationService.findOneById(id);
      const userNotification =
        await this.notificationService.findNotificationForUser(
          request.user.sub,
          id,
        );
  
      if (!notification) {
        throw new NotFoundException('Notification with this ID does not exist');
      }
      if (!userNotification) {
        throw new NotFoundException(
          'You do not have access to this notification',
        );
      }
  
      await this.notificationService.delete(id);
  
      return {
        message: 'Notification deleted successfully',
      };
    }
  }
