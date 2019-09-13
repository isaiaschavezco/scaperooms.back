import { Test, TestingModule } from '@nestjs/testing';
import { CampaingController } from './campaing.controller';

describe('Campaing Controller', () => {
  let controller: CampaingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaingController],
    }).compile();

    controller = module.get<CampaingController>(CampaingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
