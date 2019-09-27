import { Test, TestingModule } from '@nestjs/testing';
import { PointsTypeService } from './points-type.service';

describe('PointsTypeService', () => {
  let service: PointsTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointsTypeService],
    }).compile();

    service = module.get<PointsTypeService>(PointsTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
