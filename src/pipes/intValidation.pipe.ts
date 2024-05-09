import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotAcceptableException,
} from '@nestjs/common';

@Injectable()
export class IntValidationPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new NotAcceptableException(
        `입력값이 유효하지 않습니다 - <${metadata.data}> 해당 변수는 정수여야 합니다.`,
      );
    }
    return val;
  }
}
