import { ApiProperty } from "@nestjs/swagger";
export class CreateUserTokenDto {
  @ApiProperty({description:'사용자와 매핑해야하는 token',example:'fwqewfjlwjlkeq'})
  token: string;
}
