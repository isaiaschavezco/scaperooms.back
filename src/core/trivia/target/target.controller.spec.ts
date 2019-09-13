import { Test, TestingModule } from '@nestjs/testing';
import { TargetController } from './target.controller';

describe('Target Controller', () => {
  let controller: TargetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TargetController],
    }).compile();

    controller = module.get<TargetController>(TargetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
