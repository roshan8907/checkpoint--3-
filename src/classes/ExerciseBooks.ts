import type { Stationery } from '../interfaces/Stationery';

export class ExerciseBooks implements Stationery {
  getName() {
    return 'Exercise Books';
  }

  getCost() {
    return 30;
  }
}