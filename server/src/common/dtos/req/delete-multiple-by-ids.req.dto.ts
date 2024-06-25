import { IsValidArrayNumber } from 'src/common/decorators/custom-validator.decorator';

export class DeleteMultipleByIdNumberReqDto {
  @IsValidArrayNumber({ required: true, minSize: 1, unique: true })
  ids: number[];
}
