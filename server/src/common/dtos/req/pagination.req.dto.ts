import { IsValidNumber } from 'src/common/decorators/custom-validator.decorator';

export abstract class PaginationReqDto {
  @IsValidNumber({ required: false, min: 1 })
  page?: number = 1;

  @IsValidNumber({ required: false, min: 1, max: 100 })
  limit?: number = 20;
}
