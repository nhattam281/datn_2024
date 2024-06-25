import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor, groups?: string[] | string) {
  return function (target: any, propertyKey: string, descriptor: any): void {
    if (!Array.isArray(groups)) groups = [groups];

    (UseInterceptors(new SerializeInterceptor(dto, groups)) as MethodDecorator)(
      target,
      propertyKey,
      descriptor,
    );
    ApiExtraModels(dto)(target, propertyKey, descriptor);
    ApiResponse(
      { schema: { $ref: getSchemaPath(dto) }, status: 200 },
      { overrideExisting: true },
    )(target, propertyKey, descriptor);
    ApiResponse(
      { schema: { $ref: getSchemaPath(dto) }, status: 201 },
      { overrideExisting: true },
    )(target, propertyKey, descriptor);
  };
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(
    private dto: ClassConstructor,
    private groups?: string[],
  ) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: ClassConstructor) => {
        const options: ClassTransformOptions = {
          ...(this.groups && { groups: this.groups }),
        };

        return plainToInstance(this.dto, data, options);
      }),
    );
  }
}
