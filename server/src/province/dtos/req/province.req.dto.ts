import {
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from 'src/common/decorators/custom-validator.decorator';
import { ProvinceType } from 'src/province/enums/province.enum';

export class GetListProvinceReqDto {
  @IsValidText({ required: false })
  searchText?: string;

  @IsValidNumber({ required: false })
  parentId?: number;

  @IsValidEnum({ enum: ProvinceType, required: false })
  type?: ProvinceType;
}
