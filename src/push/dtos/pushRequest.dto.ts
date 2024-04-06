import { ApiProperty } from "@nestjs/swagger";

export class PushRequestDto{
    @ApiProperty({
        description:'해당 device의 token',
        example:['weaqrtt4w5ytjftjyurttyuyte'],
        type:[String],
        required: true,
    })
    token: string[];
    @ApiProperty({
        description: '알림의 제목',
        example:'안전교육 이수 안내',
    })
    title:string;
    @ApiProperty({
        description:'알림의 본문',
        example:'안전교육 이수를 언제까지 해야한다'
    })
    content:string;
}