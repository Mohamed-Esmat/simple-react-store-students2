import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";

function ProductList({ products = [], onAddToCart }) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={() => onAddToCart(product.id)}
        />
      ))}
    </div>
  );
}

export default ProductList;
