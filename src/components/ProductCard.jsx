import styles from "./ProductCard.module.css";

function ProductCard({ product, onAdd }) {
  const { title, image, price, rating } = product;

  return (
    <article className={styles.card}>
      <div className={styles.thumbWrap}>
        <img className={styles.thumb} src={image} alt={title} loading="lazy" />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.row}>
        <span className={styles.price}>${price.toFixed(2)}</span>
        <span className={styles.rating} title={`${rating.rate ?? "N/A"}`}>
          ⭐ {rating.rate ?? "N/A"}
        </span>
      </div>
      <button className={styles.button} onClick={onAdd}>
        Add to cart
      </button>
    </article>
  );
}

export default ProductCard;
