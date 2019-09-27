import { Test, TestingModule } from '@nestjs/testing';
import { AnswerbyusersectionService } from './answerbyusersection.service';

describe('AnswerbyusersectionService', () => {
  let service: AnswerbyusersectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerbyusersectionService],
    }).compile();

    service = module.get<AnswerbyusersectionService>(AnswerbyusersectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
