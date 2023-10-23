import { Module } from '@nestjs/common';
import { CpuModule } from 'src/cpu/cpu.module';
import { DiskModule } from 'src/disk/disk.module';
import { ComputerController } from './computer.controller';

@Module({
  // no need to import PowerModule because it is already imported into CpuModule or DiskModule
  imports: [CpuModule, DiskModule],
  controllers: [ComputerController]
})
export class ComputerModule {}
