import { Test, TestingModule } from '@nestjs/testing';
import { PointsTypeController } from './points-type.controller';

describe('PointsType Controller', () => {
  let controller: PointsTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointsTypeController],
    }).compile();

    controller = module.get<PointsTypeController>(PointsTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
