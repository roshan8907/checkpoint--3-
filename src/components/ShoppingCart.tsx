import { useMemo, useState } from 'react';
import './ShoppingCart.css';

import type { Stationery } from '../interfaces/Stationery';

import { ExerciseBooks } from '../classes/ExerciseBooks';
import { Pens } from '../classes/Pens';
import { Pencils } from '../classes/Pencils';
import { Sharpener } from '../classes/Sharpener';
import { GlueSticks } from '../classes/GlueSticks';
import { QuantityDecorator } from '../classes/QuantityDecorator';

const products: {
  id: string;
  item: Stationery;
}[] = [
  { id: 'books', item: new ExerciseBooks() },
  { id: 'pens', item: new Pens() },
  { id: 'pencils', item: new Pencils() },
  { id: 'sharpener', item: new Sharpener() },
  { id: 'glue', item: new GlueSticks() },
];

type Selection = Record<
  string,
  {
    selected: boolean;
    quantity: number;
  }
>;

const initial: Selection = Object.fromEntries(
  products.map((p) => [
    p.id,
    {
      selected: false,
      quantity: 1,
    },
  ])
);

export default function ShoppingCart() {
  const [selection, setSelection] = useState<Selection>(initial);
  const [showTotal, setShowTotal] = useState(false);

  const selected = useMemo(
    () => products.filter((p) => selection[p.id]?.selected),
    [selection]
  );

  const total = selected.reduce((sum, p) => {
    const quantity = selection[p.id].quantity;
    const decoratedItem = new QuantityDecorator(p.item, quantity);

    return sum + decoratedItem.getCost();
  }, 0);

  function update(
    id: string,
    changes: Partial<Selection[string]>
  ) {
    setSelection((current) => ({
      ...current,
      [id]: {
        ...current[id],
        ...changes,
      },
    }));

    setShowTotal(false);
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div className="eyebrow">STATIONERY STORE</div>
        <h1>Shopping Cart</h1>
        <p>Choose your stationery items and quantities.</p>
      </header>

      <section className="cart-panel">
        <div className="panel-heading">
          <div>
            <h2>Your items</h2>
            <p>Select the products you want to purchase.</p>
          </div>

          <span className="item-count">
            {selected.length} selected
          </span>
        </div>

        <div className="product-list">
          {products.map((p, i) => {
            const s = selection[p.id];

            return (
              <div className="product-row" key={p.id}>
                <div className="product-number">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <label className="product-choice">
                  <input
                    type="checkbox"
                    checked={s.selected}
                    onChange={(e) =>
                      update(p.id, {
                        selected: e.target.checked,
                      })
                    }
                  />

                  <span className="product-name">
                    {p.item.getName()}
                  </span>
                </label>

                <span className="unit-price">
                  NZ${p.item.getCost().toFixed(2)}
                </span>

                <label className="quantity-control">
                  <span>Qty</span>

                  <select
                    aria-label={`${p.item.getName()} quantity`}
                    value={s.quantity}
                    disabled={!s.selected}
                    onChange={(e) =>
                      update(p.id, {
                        quantity: Number(e.target.value),
                      })
                    }
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            );
          })}
        </div>

        <div className="cart-actions">
          <span className="selection-note">
            {selected.length === 0
              ? 'No items selected yet'
              : `${selected.length} product type${
                  selected.length === 1 ? '' : 's'
                } in your cart`}
          </span>

          <button
            className="total-button"
            disabled={selected.length === 0}
            onClick={() => setShowTotal(true)}
          >
            Display Total Cost
          </button>
        </div>

        {showTotal && (
          <div className="total-result" role="status">
            <span>Total cost</span>
            <strong>NZ${total.toFixed(2)}</strong>
          </div>
        )}
      </section>

      <footer>Weekly Checkpoint 3 · IA730001</footer>
    </main>
  );
}