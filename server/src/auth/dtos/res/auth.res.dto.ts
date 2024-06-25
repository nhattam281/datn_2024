import { Expose } from 'class-transformer';

@Expose()
export class LoginAuthResDto {
  accessToken: string;
}

@Expose()
export class RegisterAuthResDto {
  accessToken: string;
}
