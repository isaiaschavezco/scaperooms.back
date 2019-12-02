import { Test, TestingModule } from '@nestjs/testing';
import { ConfigutarionService } from './configuration.service';

describe('ConfigutarionService', () => {
  let service: ConfigutarionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigutarionService],
    }).compile();

    service = module.get<ConfigutarionService>(ConfigutarionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
