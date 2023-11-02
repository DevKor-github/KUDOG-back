import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPositive, IsString } from 'class-validator';

export class SignupRequestDto {
  @IsString()
  @ApiProperty({ example: '홍길동' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'devkor.appply@gmail.com' })
  subscriberEmail: string;

  @IsEmail()
  @ApiProperty({ example: 'devkor.apply@korea.ac.kr' })
  portalEmail: string;

  @IsString()
  @ApiProperty({ example: 'password1' })
  password: string;
  @IsString()
  @ApiProperty({ example: '컴퓨터학과' })
  major: string;

  @IsString()
  @ApiProperty({ example: '22학번' })
  studentId: string;

  @IsPositive()
  @ApiProperty({ example: 2 })
  grade: number;
}
