import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class NotificationFromCrawlerRequestDto {
  @IsArray({ message: 'ids는 배열이어야 합니다.' })
  @ArrayNotEmpty({ message: 'ids 배열은 비어 있으면 안 됩니다.' })
  @IsInt({ each: true, message: 'ids 배열의 모든 요소는 정수여야 합니다.' })
  ids: number[];
}
