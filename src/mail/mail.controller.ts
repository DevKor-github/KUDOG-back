import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { verifyRequestDto } from './dtos/verifyReqest.dto';
import { verifyCodeRequestDto } from './dtos/verifyCodeRequest.dto';

@Controller('mail')
@ApiTags('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/verify/send')
  @ApiOperation({
    summary: '인증 메일 전송',
    description:
      'korea.ac.kr 메일을 인증합니다. 10초 내에 재요청 시, 이미 인증된 메일을 요청할 시 에러가 발생합니다.',
  })
  @ApiCreatedResponse({ description: '메일 전송 성공' })
  @ApiConflictResponse({ description: '사용중인 메일' })
  @ApiBadRequestResponse({ description: '10초 내 재요청' })
  async sendVerifyMail(@Body() body: verifyRequestDto) {
    try {
      return await this.mailService.sendVerificationCode(body.email);
    } catch (err) {
      return err;
    }
  }

  @Post('/verify/check')
  @ApiOperation({
    summary: '인증 코드 확인',
    description: '인증 코드를 확인합니다.',
  })
  @ApiOkResponse({ description: '인증 성공' })
  @ApiNotFoundResponse({ description: '해당 메일이 존재하지 않음' })
  @ApiBadRequestResponse({ description: '인증 코드 불일치' })
  async checkVerifyCode(@Body() body: verifyCodeRequestDto) {
    try {
      return await this.mailService.checkVerificationCode(
        body.email,
        body.code,
      );
    } catch (err) {
      return err;
    }
  }
}
