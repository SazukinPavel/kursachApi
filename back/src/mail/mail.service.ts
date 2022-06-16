import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entitys/User.entity';

@Injectable()
export class MailService {
  constructor(
    private configService:ConfigService,
    private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `${this.configService.get('ADRESS')}auth/confirm?token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Добро пожаловать в Cool Courses! Подтвердите ваш Email',
        html:`
        <p>Привет ${user.name},</p>
        <p>Нажмите на эту ссылку для подтверждения</p>
        <p>
            <a href="${url}">Подтвердить</a>
        </p>`
    });
  }
}