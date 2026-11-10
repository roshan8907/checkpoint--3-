import type { Stationery } from '../interfaces/Stationery';

export class GlueSticks implements Stationery {
  getName() {
    return 'Glue Sticks';
  }

  getCost() {
    return 25;
  }
}