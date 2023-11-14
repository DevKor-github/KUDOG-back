import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { providerResponseDto } from './dtos/providerResponse.dto';
import { Provider } from 'src/entities/provider.entity';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}
  async getProviderList(): Promise<providerResponseDto[]> {
    const providers = await this.providerRepository.find();

    const dtos: providerResponseDto[] = providers.map((provider) => {
      const { id, name } = provider;
      return {
        id,
        name,
      };
    });

    return dtos;
  }
}
