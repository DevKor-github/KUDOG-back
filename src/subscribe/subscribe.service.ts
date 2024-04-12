import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SubscribeBoxRequestDto } from './dtos/subscribeBoxRequest.dto';
import { SubscribeBoxResponseDto } from './dtos/subscribeBoxResponse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  Category,
  CategoryPerSubscribeBoxEntity,
  Notice,
  ScrapBox,
  SubscribeBox,
} from 'src/entities';
import { SubscribeBoxResponseDtoWithNotices } from './dtos/subscribeBoxResponseWithNotices.dto';
import { PageResponse } from 'src/interfaces/pageResponse';
import { PageQuery } from 'src/interfaces/pageQuery';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(SubscribeBox)
    private readonly subscribeBoxRepository: Repository<SubscribeBox>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
    @InjectRepository(ScrapBox)
    private readonly scrapBoxRepository: Repository<ScrapBox>,
    @InjectRepository(CategoryPerSubscribeBoxEntity)
    private readonly categoryPerSubscribeBoxRepository: Repository<CategoryPerSubscribeBoxEntity>,
  ) {}

  async createSubscribeBox(
    userId: number,
    dto: SubscribeBoxRequestDto,
  ): Promise<SubscribeBoxResponseDto> {
    const subscribeBox = await this.subscribeBoxRepository.insert({
      name: dto.name,
      mail: dto.email,
      user: { id: userId },
    });

    const categories = await this.categoryRepository.find({
      where: { name: In(dto.categories), provider: { name: dto.provider } },
    });

    await this.categoryPerSubscribeBoxRepository.save(
      categories.map((category) => ({
        subscribeBox: subscribeBox.raw[0],
        category: category,
      })),
    );

    const box = await this.subscribeBoxRepository.findOne({
      where: { id: subscribeBox.raw[0].id },
      relations: [
        'categories',
        'categories.category',
        'categories.category.provider',
      ],
    });
    return new SubscribeBoxResponseDto(box);
  }

  async getSubscribeBoxes(
    userId: number,
    pageQuery: PageQuery,
  ): Promise<PageResponse<SubscribeBoxResponseDto>> {
    const [records, total] = await this.subscribeBoxRepository.findAndCount({
      where: { user: { id: userId } },
      relations: [
        'categories',
        'categories.category',
        'categories.category.provider',
      ],
      skip: (pageQuery.page - 1) * pageQuery.pageSize,
      take: pageQuery.pageSize,
    });
    const dtos = records.map(
      (subscribeBox) => new SubscribeBoxResponseDto(subscribeBox),
    );
    return new PageResponse<SubscribeBoxResponseDto>(dtos, total, pageQuery);
  }

  async getSubscribeBoxInfo(
    userId: number,
    subscribeBoxId: number,
    date: string,
  ): Promise<SubscribeBoxResponseDtoWithNotices> {
    const subscribeBox = await this.subscribeBoxRepository.findOne({
      where: { id: subscribeBoxId },
      relations: [
        'categories',
        'categories.category',
        'categories.category.provider',
        'user',
      ],
    });
    const notices = await this.noticeRepository.find({
      where: {
        date: date,
        category: In(
          subscribeBox.categories.map((category) => {
            return category.category_id;
          }),
        ),
      },
      relations: ['category.provider'],
    });

    const scrapBoxes = await this.scrapBoxRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['scraps'],
    });

    if (!subscribeBox)
      throw new NotFoundException('해당 구독함이 존재하지 않습니다');
    if (subscribeBox.user.id !== userId)
      throw new ForbiddenException('권한이 없습니다');

    return new SubscribeBoxResponseDtoWithNotices(
      subscribeBox,
      notices,
      scrapBoxes,
    );
  }

  async updateSubscribeBox(
    subscribeBoxId: number,
    userId: number,
    dto: SubscribeBoxRequestDto,
  ): Promise<SubscribeBoxResponseDto> {
    const subscribeBox = await this.subscribeBoxRepository.findOne({
      where: { id: subscribeBoxId },
      relations: ['user', 'categories'],
    });
    if (!subscribeBox)
      throw new NotFoundException('해당 구독함이 존재하지 않습니다');
    if (subscribeBox.user.id !== userId)
      throw new ForbiddenException('권한이 없습니다');

    //구독함 정보 수정
    subscribeBox.mail = dto.email;
    subscribeBox.name = dto.name;
    subscribeBox.sendTime = dto.sendTime;
    await this.subscribeBoxRepository.save(subscribeBox);

    //구독한 카테고리 수정
    const newCategories = await this.categoryRepository.find({
      where: { name: In(dto.categories), provider: { name: dto.provider } },
    });

    //기존 카테고리 삭제
    const categoriesToDelete: CategoryPerSubscribeBoxEntity[] =
      subscribeBox.categories.filter(
        (category) => !newCategories.some((c) => c.id === category.category_id),
      );
    await Promise.all(
      categoriesToDelete.map((category) =>
        this.categoryPerSubscribeBoxRepository.delete({
          category_id: category.category_id,
          box_id: subscribeBoxId,
        }),
      ),
    );

    //새로운 카테고리 추가
    const categoriesToAdd: Category[] = newCategories.filter(
      (category) =>
        !subscribeBox.categories.some((c) => c.category_id === category.id),
    );
    await this.categoryPerSubscribeBoxRepository.save(
      categoriesToAdd.map((category) => ({
        subscribeBox: { id: subscribeBox.id },
        category: category,
      })),
    );

    //바뀐 구독함 조회
    const box = await this.subscribeBoxRepository.findOne({
      where: { id: subscribeBox.id },
      relations: [
        'categories',
        'categories.category',
        'categories.category.provider',
      ],
    });

    return new SubscribeBoxResponseDto(box);
  }

  async deleteSubscribeBox(
    subscribeBoxId: number,
    userId: number,
  ): Promise<void> {
    const subscribeBox = await this.subscribeBoxRepository.findOne({
      where: { id: subscribeBoxId },
      relations: ['user'],
    });
    if (!subscribeBox)
      throw new NotFoundException('해당 구독함이 존재하지 않습니다');
    if (subscribeBox.user.id !== userId)
      throw new ForbiddenException('권한이 없습니다');
    await this.subscribeBoxRepository.delete(subscribeBoxId);
  }
}
