import { Module } from '@nestjs/common';
import { RecombeeService } from './services/recombee.service';

@Module({
  controllers: [],
  providers: [RecombeeService],
  exports: [RecombeeService],
})
export class ExternalModule {}
