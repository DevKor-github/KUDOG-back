import { BadRequestException, Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  ScrapBox,KudogUser } from 'src/entities';
import {  Repository } from 'typeorm';

@Injectable()
export class ScrapService {
  constructor(
    @InjectRepository(ScrapBox)
    private readonly scrapBoxRepository: Repository<ScrapBox>,
    @InjectRepository(KudogUser)
    private readonly userRepository: Repository<KudogUser>,
  ) {}

  async createScrapBox(userId: number, name: string) {
    try{
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('해당 user가 존재하지 않습니다');
    const existScrapBox = await this.scrapBoxRepository.findOne({
      where: {
        user: { id: userId },
        name: name,
      },
    });
    if (existScrapBox)
      throw new BadRequestException('해당 이름의 scrapbox는 존재합니다');
    const scrapBox = this.scrapBoxRepository.create({ user, name });
    return await this.scrapBoxRepository.save(scrapBox);
  }
  catch(err){
    throw new BadRequestException('ScrapBox 생성을 실패하였습니다')
  }
  }
  async getScrapBoxes(userId: number) {
    try{
    const scrapBoxes = this.scrapBoxRepository.find({
      where: { user: { id: userId } },
    });
    if (!scrapBoxes)
      throw new NotFoundException('scrapBox가 존재하지 않습니다');

    return scrapBoxes;
  }catch(err){
    throw new BadRequestException('ScrapBox를 조회하는 것을 실패하였습니다')
  }
  }

  async updateScrapBox(scrapBoxId: number, newName: string) {
    try{
    const scrapBox = await this.scrapBoxRepository.findOne({
      where: { id: scrapBoxId },
    });
    if (!scrapBox)
      throw new NotFoundException('해당 ScrapBox가 존재하지 않습니다');

    scrapBox.name = newName;
    return this.scrapBoxRepository.save(scrapBox);}
    catch(err){
      throw new BadRequestException('ScrapBox 업데이트를 실패하였습니다')
    }
  }

  async deleteScrapBox(scrapBoxId: number) {
    try {
      const result = await this.scrapBoxRepository.delete(scrapBoxId);
      if (result.affected === 0) {
        throw new NotFoundException(
          `ScrapBox를 찾을 수 없습니다`,
        );
      }
    } catch (err) {
      throw new BadRequestException('지우는 것을 실패했습니다');}
  }
}
