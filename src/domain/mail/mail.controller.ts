import { NamedController } from '@/common/decorators';
import { MailDocs } from '@/common/decorators/docs/mail.decorator';
import { Body, Post } from '@nestjs/common';
import { verifyCodeRequestDto } from './dtos/verifyCodeRequest.dto';
import { verifyRequestDto } from './dtos/verifyRequest.dto';
import { MailService } from './mail.service';

@MailDocs
@NamedController('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/verify/send')
  async sendVerifyMail(@Body() body: verifyRequestDto): Promise<void> {
    return this.mailService.sendVerificationCode(body.email);
  }

  @Post('/verify/check')
  async checkVerifyCode(@Body() body: verifyCodeRequestDto): Promise<void> {
    return this.mailService.checkVerificationCode(body.email, body.code);
  }
}
