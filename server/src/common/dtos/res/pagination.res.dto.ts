import { Exclude, Expose } from 'class-transformer';

@Exclude()
export abstract class PaginationResDto {
  @Expose()
  meta: {
    itemCount: number;
    totalItems?: number;
    itemsPerPage: number;
    totalPages?: number;
    currentPage: number;
  };

  @Expose()
  links?: {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
  };
}
