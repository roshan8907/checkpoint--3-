import type { Stationery } from '../interfaces/Stationery';

export class Sharpener implements Stationery {
  getName() {
    return 'Sharpener';
  }

  getCost() {
    return 18;
  }
}