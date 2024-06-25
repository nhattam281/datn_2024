import {
  IsValidArrayNumber,
  IsValidBoolean,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
  IsValidUrl,
} from 'src/common/decorators/custom-validator.decorator';
import { PaginationReqDto } from 'src/common/dtos/req/pagination.req.dto';
import { PostReactionType } from 'src/post/enums/post-reaction.enum';
import { PostGender } from 'src/post/enums/post.enum';

export enum GetListPostReqDtoOrderByEnum {
  CREATED_DATE = 'CREATED_DATE',
}

export enum GetListPostReqDtoOrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetListPostReqDto extends PaginationReqDto {
  @IsValidText({ required: false })
  searchText?: string;

  @IsValidEnum({ enum: GetListPostReqDtoOrderByEnum, required: false })
  orderBy?: GetListPostReqDtoOrderByEnum;

  @IsValidEnum({ enum: GetListPostReqDtoOrderDirection, required: false })
  orderDirection?: GetListPostReqDtoOrderDirection;

  @IsValidNumber({ required: false })
  categoryId?: number;

  @IsValidNumber({ required: false })
  minPrice?: number;

  @IsValidNumber({ required: false })
  maxPrice?: number;

  @IsValidNumber({ required: false })
  minArea?: number;

  @IsValidNumber({ required: false })
  maxArea?: number;

  @IsValidNumber({ required: false })
  provinceId?: number;

  @IsValidNumber({ required: false })
  districtId?: number;

  @IsValidNumber({ required: false })
  wardId?: number;
}

export class SavePostReqDto {
  @IsValidNumber()
  provinceId: number;

  @IsValidNumber()
  wardId: number;

  @IsValidNumber()
  districtId: number;

  @IsValidText()
  address: string;

  @IsValidText()
  title: string;

  @IsValidText({ maxLength: 999999 })
  desc: string;

  @IsValidNumber({ min: 1 })
  price: number;

  @IsValidNumber({ min: 1 })
  area: number;

  @IsValidEnum({ enum: PostGender, required: false })
  gender?: PostGender;

  @IsValidArrayNumber({ minSize: 1 })
  imageIds: number[];

  @IsValidNumber({ required: false })
  videoId?: number;

  @IsValidNumber()
  categoryId: number;
}

export class GetMyPostReqDto extends PaginationReqDto {
  @IsValidText({ required: false })
  searchText?: string;

  @IsValidBoolean({ required: false })
  isExpired?: boolean;
}

export class GetRecommendedPostReqDto {
  @IsValidNumber({ required: true })
  amount: number;
}
