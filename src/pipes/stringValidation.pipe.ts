import {
  ArgumentMetadata,
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class StringValidationPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (value !== undefined && typeof value !== 'string') {
      throw new NotAcceptableException(
        `입력값이 유효하지 않습니다 - <${metadata.data}> 해당 변수는 문자열이어야 합니다.`,
      );
    }
    return value;
  }
}
