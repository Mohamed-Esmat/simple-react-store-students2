import styles from "./Header.module.css";

function Header({ cartCount = 0, onCartClick }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.brand}>
          <span className={styles.logo}>🛍️</span> React Shop
        </h1>

        <button type="button" className={styles.cart} onClick={onCartClick}>
          <span className={styles.cartIcon}>🛒</span>
          <span className={styles.badge}>{cartCount}</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
