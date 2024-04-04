import { ApiProperty } from '@nestjs/swagger';
import { Notice, ScrapBox } from 'src/entities';

export class NoticeInfoResponseDto {
  @ApiProperty({ description: '공지사항 ID', example: 1 })
  id: number;

  @ApiProperty({
    description: '공지사항 제목',
    example: '2023학년도 제1학기 복수전공 면접',
  })
  title: string;

  @ApiProperty({
    description: '공지사항 parsed html',
    example: `<table>
    		
		<colgroup>
            <col width="20%" />
    		<col width="*" />
		</colgroup>
		<tbody>
		
		
      
        <tr>
        	<th scope="row">제목</th>
        	<td>[스나이퍼팩토리] 교육관련 앱/웹 서비스 제작 주니어 해커톤 참가자 모집</td>
      	</tr>
      	
		                
        
      	
      	
      <tr>
         <th scope="row">내용</th>
         <td class="h150">
        		
        	
				
				
		
				<div class="article-text">
					
					
					
					
					
					
						<div class="fr-view"><p><img src="https://info.korea.ac.kr/_res/editor_image/2023/11/wmTOqVVWEeEKBOOsgLHI.jpg" class="fr-fic fr-dib" data-alt="screen shot" data-path="/_res/editor_image/2023/11/wmTOqVVWEeEKBOOsgLHI.jpg" data-file_name="wmTOqVVWEeEKBOOsgLHI.jpg" data-success="true" data-size="595433"></p><p><br></p><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">■ 모집일정</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">1. 모집 : &nbsp;~ 11월 14일(화)</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">2. 합격자 발표 : 11월 15일(수)</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">3. 참여자 매칭 : 11월 16일(목) ~ 11월 19일(일)</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">4. 참여자 팀 발표 : 11월 20일(월)</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;"><br></span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">■ 혜택</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">- 서비스 기획 &amp; 디자인이 가능한 UXUI 디자인팀 지원</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">- 수상팀 상금 지원(총 상금 180만원)</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">- 주니어 개발자 및 디자이너 네트워킹</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;"><br></span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">■ 시상내역</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">- 대상 : 100만원</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">- 최우수상 : 50만원</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">- 우수상 : 30만원</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;"><br></span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">■ 필수사항</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">아래 기재된 프레임워크 중 하나라도 사용해본 자</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">- Flutter, React, Svelte, Angular, React Native, Kotlin, Swift</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">(팀은 같은 스택으로 배정되며, 팀원 수에 따라 무작위로 배정될 수 있습니다.)</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;"><br></span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">■ 우대사항</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">Firebase를 사용해본 적이 있는 자</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;"><br></span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">■ 해커톤 일정</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">1) 해커톤 기획 및 개발 : 11/20(월) ~ 11/30(목)</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">&nbsp; &nbsp;(매일 오후 1시 ~ 오후6시 온라인 ZEP에서 진행)</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">2) 해커톤 발표대회 진행 : 12/01(금)</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;"><br></span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">■ 해커톤 방식</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">1. 참여 방식</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">본 해커톤은 &quot; 온라인 ZEP &quot;으로 진행</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;"><br></span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">2. 참여 준비물</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">개인 노트북 또는 데스크탑 컴퓨터</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">안정적인 인터넷 연결</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">필요한 개발 환경 (IDE, 라이브러리 등)</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;"><br></span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">3. 진행 내용</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">자유주제 혹은 제공된 주제 택하여 진행</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">자세한 내용 링크 : https://sniperfactory.com/course/j5duwrtxkol7hb2</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;"><br></span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">4. 팀 구성</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">디자이너 4명 + 개발자 2명 혹은 디자이너 3명 + 개발자 3명&nbsp;</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">-&gt; 6명이 한팀으로 진행</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">(모집 상황에 따라 인원이 변동 될 수 있음)</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;"><br></span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">* 온라인 해커톤 ZEP 공간은 합격자 발표 후 공지 예정 입니다.</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;"><br></span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">■신청방법</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">구글 폼을 통해 접수</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">-&gt; https://forms.gle/2AnM9cH2y2pFkJ3G9</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;"><br></span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">■문의사항</span></div><div style='color: rgb(17, 17, 17); font-family: "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif; font-size: 13.3333px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><span style="font-size: 13.3333px;">CS 문의 : https://sniperfactory.com/</span></div><p><br></p></div>
					
		
					
		
				</div>
		
				
				
		        		
        			
        
        
         </td>
      </tr>
      <tr>
         <th scope="row">첨부</th>
         <td>
			         		
			
			
         </td>
      </tr>
    </tbody>
	</table>`,
  })
  content: string;

  @ApiProperty({ description: '공지 작성자', example: '교무처' })
  writer: string;

  @ApiProperty({ description: '공지 작성일', example: '2023-11-07' })
  date: string;

  @ApiProperty({
    description: '해당 공지사항 url',
    example:
      'https://info.korea.ac.kr/info/board/news.do?mode=view&articleNo=336275&article.offset=0&articleLimit=10&totalNoticeYn=N&totalBoardNo=',
  })
  url: string;

  @ApiProperty({
    description: '해당 공지사항 조회수',
    example: 0,
  })
  view: number;

  @ApiProperty({ description: '공지사항 스크랩 여부', example: false })
  scrapped: boolean;

  @ApiProperty({ description: '공지사항 스크랩 수', example: 0 })
  scrapCount: number;

  @ApiProperty({
    description: '공지사항이 올라가있는 페이지',
    examples: ['KUPID', '정보대학', '디자인 조형학부'],
  })
  provider: string;

  @ApiProperty({
    description:
      '공지사항 하위 카테고리 - `${provider} ${category}` 형식으로 표기하면 될 것 같아요!',
    examples: ['학부 공지사항, 장학 정보'],
  })
  category: string;

  @ApiProperty({
    description: '공지 사항이 포함된 스크랩박스들의 id',
    example: [1, 2, 3],
  })
  scrapBoxId: number[];

  @ApiProperty({
    description: '전처리된 카테고리',
    example: '장학정보',
  })
  mappedCategory: string;

  static entityToDto(
    entity: Notice,
    scrapBoxes?: ScrapBox[],
  ): NoticeInfoResponseDto {
    const scrapBoxIds = scrapBoxes
      ? scrapBoxes
          .filter((scrapBox) =>
            scrapBox.scraps.some((scrap) => scrap.noticeId === entity.id),
          )
          .map((scrapBox) => scrapBox.id)
      : [];
    return {
      id: entity.id,
      title: entity.title,
      content: entity.content,
      writer: entity.writer,
      date: entity.date,
      view: entity.view,
      url: entity.url,
      scrapped: scrapBoxIds.length > 0,
      scrapCount: entity.scraps.length,
      provider: entity.category.provider.name,
      category: entity.category.name,
      mappedCategory: entity.category.mappedCategory,
      scrapBoxId: scrapBoxIds,
    };
  }
}
