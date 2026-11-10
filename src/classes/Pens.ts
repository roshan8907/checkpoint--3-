import type { Stationery } from '../interfaces/Stationery';

export class Pens implements Stationery {
  getName() {
    return 'Pens';
  }

  getCost() {
    return 12;
  }
}