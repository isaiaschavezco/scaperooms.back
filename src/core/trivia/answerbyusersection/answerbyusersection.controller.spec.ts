import { Test, TestingModule } from '@nestjs/testing';
import { AnswerbyusersectionController } from './answerbyusersection.controller';

describe('Answerbyusersection Controller', () => {
  let controller: AnswerbyusersectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerbyusersectionController],
    }).compile();

    controller = module.get<AnswerbyusersectionController>(AnswerbyusersectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
