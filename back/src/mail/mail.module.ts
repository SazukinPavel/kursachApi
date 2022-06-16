import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  providers: [MailService],
  imports:[ MailerModule.forRoot({
    transport: {
      host: 'smtp.yandex.com',
      secure: false,
      auth: {
        user: 'courses.cool@yandex.by',
        pass: 'Sazukin9524',
      },
    },
    defaults: {
      from: '"Pavel Traut" <courses.cool@yandex.by>',
    },
  }),
],
exports: [MailService],
})
export class MailModule {}
