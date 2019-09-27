import { Test, TestingModule } from '@nestjs/testing';
import { PointsbyuserController } from './pointsbyuser.controller';

describe('Pointsbyuser Controller', () => {
  let controller: PointsbyuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointsbyuserController],
    }).compile();

    controller = module.get<PointsbyuserController>(PointsbyuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
