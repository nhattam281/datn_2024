import {
  Column,
  ColumnOptions,
  PrimaryColumn,
  PrimaryColumnOptions,
} from 'typeorm';
import { bigNumberTransformer } from '../helpers/typeorm.helper';

type ColumnPrimaryGeneratedOpts = PrimaryColumnOptions;
export const ColumnPrimaryGenerated = (opts?: ColumnPrimaryGeneratedOpts) => {
  return (target: any, propertyKey: string) => {
    PrimaryColumn({
      type: 'int',
      generated: 'increment',
      transformer: bigNumberTransformer,
      ...opts,
    })(target, propertyKey);
  };
};

type ColumnStringOpts = ColumnOptions;
export const ColumnString = (opts?: ColumnStringOpts) => {
  return (target: any, propertyKey: string) => {
    Column({ type: 'varchar', length: 255, ...opts })(target, propertyKey);
  };
};

type ColumnIntOpts = ColumnOptions;
export const ColumnInt = (opts?: ColumnIntOpts) => {
  return (target: any, propertyKey: string) => {
    Column({ type: 'int', transformer: bigNumberTransformer, ...opts })(
      target,
      propertyKey,
    );
  };
};

type ColumnFloatOpts = ColumnOptions;
export const ColumnFloat = (opts?: ColumnFloatOpts) => {
  return (target: any, propertyKey: string) => {
    Column({ type: 'float', transformer: bigNumberTransformer, ...opts })(
      target,
      propertyKey,
    );
  };
};

type ColumnDateOpts = ColumnOptions;
export const ColumnDate = (opts?: ColumnDateOpts) => {
  return (target: any, propertyKey: string) => {
    Column({ type: 'timestamp', ...opts })(target, propertyKey);
  };
};

type ColumnBoolOpts = ColumnOptions;
export const ColumnBool = (opts?: ColumnBoolOpts) => {
  return (target: any, propertyKey: string) => {
    Column({ type: 'boolean', ...opts })(target, propertyKey);
  };
};
