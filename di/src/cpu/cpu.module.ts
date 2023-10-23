import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from 'src/power/power.module';

@Module({
  // imports other modules for use in current module
  imports: [PowerModule],
  providers: [CpuService],
  exports: [CpuService],
  
})
export class CpuModule {}
