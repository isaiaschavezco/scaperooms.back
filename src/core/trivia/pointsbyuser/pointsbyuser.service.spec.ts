import { Test, TestingModule } from '@nestjs/testing';
import { PointsbyuserService } from './pointsbyuser.service';

describe('PointsbyuserService', () => {
  let service: PointsbyuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointsbyuserService],
    }).compile();

    service = module.get<PointsbyuserService>(PointsbyuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
