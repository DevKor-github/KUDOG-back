import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice, Scrap, ScrapBox } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ScrapboxService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
    @InjectRepository(Scrap)
    private readonly scrapRepository: Repository<Scrap>,
    @InjectRepository(ScrapBox)
    private readonly scrapBoxRepository: Repository<ScrapBox>,
  ) {}

  //async FindNoticeinScarpbox()

  //스크랩함에 스크랩되어 있는 하나의 notice만을 삭제하는 함수
  async removeNoticeinScrapBox(
    scrapBoxId: number,
    userId: number,
    noticeId: number,
  ) {
    const entity = await this.scrapBoxRepository.findOne({
      where: {
        ScrapBox: { id: scrapBoxId, user: { id: userId } },
        notice: { id: noticeId },
      },
    });
    if (entity) {
      await this.scrapBoxRepository.remove(entity);
      return true;
    }
    return false;
  }

  //스크랩함에 스크랩되어 있는 여러 notices를 한 번에 삭제하는 함수 [보완이 필요]
  async removeNoticesinScrapBox(scrapBoxId: number) {
    try {
      const entities = await this.scrapRepository.find({
        where: {
          scrapBox: { id: scrapBoxId },
        },
        relations: ['notice'],
      });

      for (const deletescraps of entities) {
        await this.scrapRepository.remove(deletescraps);
      }
      return true;
    } catch (error) {
      console.error('Error deleting notices:', error);
      return false;
    }
  }

  //스크랩함 내부에 스크랩되어 있는 notice를 조회하고, 해당 notice의 내용을 볼 수 있는 함수
  async getScrappedNotice(
    scrapBoxId: number,
    noticeId: number,
  ): Promise<ScrapBoxNoticeInfoResponseDto | null> {
    //수정이 필요. NoticeListResponseDto와 같은 걸로 가져와도 되는지?
    const scrap = await this.scrapRepository.findOne({
      where: {
        scrapBox: { id: scrapBoxId },
        notice: { id: noticeId },
      },
      relations: ['notice', 'notice.category', 'notice.category.provider'],
    });

    if (!scrap) {
      return null;
    }

    // 스크랩함 내부 notice의 내용을 DTO 형식으로 반환
    return {
      id: scrap.notice.id,
      title: scrap.notice.title,
      content: scrap.notice.content,
      date: scrap.notice.date,
      view: scrap.notice.view,
      url: scrap.notice.url,
      writer: scrap.notice.writer,
      scrapCount: 0,
      category: scrap.notice.category.name,
      provider: scrap.notice.category.provider.name,
    };
  }
}
