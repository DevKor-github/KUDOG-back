import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiTags } from '@nestjs/swagger';
import { verifyRequestDto } from './dtos/verifyRequest.dto';
import { verifyCodeRequestDto } from './dtos/verifyCodeRequest.dto';
import { Docs } from 'src/decorators/docs/mail.decorator';

@Controller('mail')
@ApiTags('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/verify/send')
  @Docs('sendVerifyMail')
  async sendVerifyMail(@Body() body: verifyRequestDto): Promise<void> {
    return await this.mailService.sendVerificationCode(body.email);
  }

  @Post('/verify/check')
  @Docs('checkVerifyCode')
  async checkVerifyCode(@Body() body: verifyCodeRequestDto): Promise<void> {
    return await this.mailService.checkVerificationCode(body.email, body.code);
  }
}
