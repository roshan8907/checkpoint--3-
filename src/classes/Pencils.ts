import type { Stationery } from '../interfaces/Stationery';

export class Pencils implements Stationery {
  getName() {
    return 'Pencils';
  }

  getCost() {
    return 10;
  }
}