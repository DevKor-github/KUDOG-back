import { ApiProperty } from '@nestjs/swagger';

export class CategoryReponseDto {
  @ApiProperty({description:'category의 id',example:1})
  id: number;
  @ApiProperty({description:'category의 이름',example:['컴퓨터학부','산업경영공학부']})
  name: string;
  @ApiProperty({description:'category의 url',example:'https:info.korea.ac.kr/info/board/notice_under.do'})
  url: string;
}
