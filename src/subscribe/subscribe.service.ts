import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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
import { NoticeListResponseDto } from 'src/notice/dtos/NoticeListResponse.dto';

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
    const subscriptions: CategoryPerSubscribeBoxEntity[] = [];
    categories.forEach((category) => {
      const subscription: CategoryPerSubscribeBoxEntity = {
        subscribeBox: subscribeBox.raw[0],
        box_id: subscribeBox.raw[0].id,
        category_id: category.id,
        category: category,
      };
      subscriptions.push(subscription);
    });
    await this.categoryPerSubscribeBoxRepository.save(subscriptions);

    const box = await this.subscribeBoxRepository.findOne({
      where: { id: subscribeBox.raw[0].id },
      relations: [
        'categories',
        'categories.category',
        'categories.category.provider',
      ],
    });
    return SubscribeBoxResponseDto.entityToDto(box);
  }

  async getSubscribeBoxes(userId: number): Promise<SubscribeBoxResponseDto[]> {
    const subscribeBoxes = await this.subscribeBoxRepository.find({
      where: { user: { id: userId } },
      relations: [
        'categories',
        'categories.category',
        'categories.category.provider',
      ],
    });
    return subscribeBoxes.map((subscribeBox) => {
      return SubscribeBoxResponseDto.entityToDto(subscribeBox);
    });
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
    return SubscribeBoxResponseDtoWithNotices.toDto(
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

    subscribeBox.mail = dto.email;
    subscribeBox.name = dto.name;

    await this.subscribeBoxRepository.save(subscribeBox);

    const categories = await this.categoryRepository.find({
      where: { name: In(dto.categories), provider: { name: dto.provider } },
    });

    const categoriesToDelete: CategoryPerSubscribeBoxEntity[] =
      subscribeBox.categories.filter((category) => {
        return !categories.some((c) => c.id === category.category_id);
      });
    if (categoriesToDelete.length > 0) {
      await Promise.all(
        categoriesToDelete.map(
          async (category) =>
            await this.categoryPerSubscribeBoxRepository.delete({
              category_id: category.category_id,
              box_id: subscribeBoxId,
            }),
        ),
      );
    }

    const categoriesToAdd: Category[] = categories.filter((category) => {
      return !subscribeBox.categories.some(
        (c) => c.category_id === category.id,
      );
    });

    const subscriptions: CategoryPerSubscribeBoxEntity[] = [];
    categoriesToAdd.forEach((category) => {
      const subscription: CategoryPerSubscribeBoxEntity = {
        subscribeBox: subscribeBox,
        box_id: subscribeBox.id,
        category_id: category.id,
        category: category,
      };
      subscriptions.push(subscription);
    });

    await this.categoryPerSubscribeBoxRepository.save(subscriptions);
    const box = await this.subscribeBoxRepository.findOne({
      where: { id: subscribeBox.id },
      relations: [
        'categories',
        'categories.category',
        'categories.category.provider',
      ],
    });

    return SubscribeBoxResponseDto.entityToDto(box);
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
