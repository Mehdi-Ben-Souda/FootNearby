import { Test, TestingModule } from '@nestjs/testing';
import { PitchController } from './pitch.controller';

describe('PitchController', () => {
  let controller: PitchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PitchController],
    }).compile();

    controller = module.get<PitchController>(PitchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
