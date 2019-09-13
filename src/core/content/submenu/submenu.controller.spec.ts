import { Test, TestingModule } from '@nestjs/testing';
import { SubmenuController } from './submenu.controller';

describe('Submenu Controller', () => {
  let controller: SubmenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmenuController],
    }).compile();

    controller = module.get<SubmenuController>(SubmenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
