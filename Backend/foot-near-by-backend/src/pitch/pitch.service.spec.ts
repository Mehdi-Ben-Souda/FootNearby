import { Test, TestingModule } from '@nestjs/testing';
import { PitchService } from './pitch.service';

describe('PitchService', () => {
  let service: PitchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PitchService],
    }).compile();

    service = module.get<PitchService>(PitchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
