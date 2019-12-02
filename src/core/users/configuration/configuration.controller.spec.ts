import { Test, TestingModule } from '@nestjs/testing';
import { ConfigutarionController } from './configuration.controller';

describe('Configutarion Controller', () => {
  let controller: ConfigutarionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigutarionController],
    }).compile();

    controller = module.get<ConfigutarionController>(ConfigutarionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
