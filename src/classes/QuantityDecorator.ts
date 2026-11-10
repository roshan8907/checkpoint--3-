import type { Stationery } from '../interfaces/Stationery';

export class QuantityDecorator implements Stationery {
  constructor(
    private readonly item: Stationery,
    private readonly quantity: number
  ) {}

  getName() {
    return this.item.getName();
  }

  getCost() {
    return this.item.getCost() * this.quantity;
  }
}