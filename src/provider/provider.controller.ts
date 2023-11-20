import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProviderService } from './provider.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DocumentedException } from 'src/interfaces/docsException';
import { providerResponseDto } from './dtos/providerResponse.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('provider')
@ApiTags('Provider') //: Swagger 문서에서 해당 컨트롤러와 관련된 API에 태그를 추가
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}
  //readonly로 객체의 의존성 주입

  @UseGuards(AuthGuard('jwt-access'))
  @Get('')
  @ApiOperation({
    summary: 'get Provider list',
    description:
      'Provider 리스트를 조회합니다. Authorization 헤더에 Bearer ${accessToken} 을 넣어주세요.',
  })
  @ApiOkResponse({
    description: 'well done',
    type: [providerResponseDto],
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'token 만료 또는 잘못된 token',
    type: DocumentedException,
  })
  async getProviderLinksById() {
    try {
      return await this.providerService.getProviderList();
    } catch (err) {
      return err;
    }
  }
}
