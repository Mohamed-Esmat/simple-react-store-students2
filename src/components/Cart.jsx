import styles from "./Cart.module.css";
function Cart({ items, onAdd, onDecrement, onDelete, onClear, onClose }) {
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.qty * item.product.price,
    0
  );
  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 className={styles.title}>Your Cart</h2>
          <button
            className={styles.iconBtn}
            onClick={onClose}
            aria-label="Close cart"
          >
            ✖️
          </button>
        </div>
        {items.length === 0 ? (
          <p className={styles.empty}>Your cart is empty.</p>
        ) : (
          <ul className={styles.list}>
            {items.map(({ product, qty }) => (
              <li key={product.id} className={styles.item}>
                <img className={styles.thumb} src={product.image} alt="" />
                <div className={styles.meta}>
                  <div className={styles.itemTitle}>{product.title}</div>
                  <div className={styles.itemRow}>
                    <span className={styles.price}>
                      ${product.price.toFixed(2)}
                    </span>
                    <span className={styles.qty}>Qty: {qty}</span>
                    <span className={styles.sub}>
                      ${(qty * product.price).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button
                    className={styles.smallBtnSecondary}
                    onClick={() => onDecrement(product.id)}
                    title="Decrease quantity"
                  >
                    -1
                  </button>
                  <button
                    className={styles.smallBtn}
                    onClick={() => onAdd(product.id)}
                    title="Increase quantity"
                  >
                    +1
                  </button>
                  <button
                    className={styles.smallBtnDanger}
                    onClick={() => onDelete(product.id)}
                    title="Remove item"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.footer}>
          <div className={styles.summary}>
            <span>{totalItems} Items</span>
            <strong>Total: ${totalPrice.toFixed(2)}</strong>
          </div>
          <div className={styles.footerActions}>
            <button
              className={styles.clearBtn}
              onClick={onClear}
              disabled={items.length === 0}
            >
              Clear Cart
            </button>
            <button
              className={styles.checkoutBtn}
              disabled={items.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
