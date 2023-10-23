import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {

  constructor(private powerService: PowerService) {}

  getData() {
    console.log('supplying 20 watts to disk from power service')
    this.powerService.supplyPower(20);
    return 'data';
  }
}
