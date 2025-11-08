import styles from "./Filters.module.css";
function Filters({
  categories,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className={styles.filters}>
      <label className={styles.group}>
        <span className={styles.label}>Category</span>
        <select
          className={styles.select}
          value={category}
          onChange={onCategoryChange}
        >
          {/* [23, 25, 27, 29, 31] */}
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.group}>
        <span className={styles.label}>Sort By</span>
        <select
          className={styles.select}
          value={sortBy}
          onChange={onSortChange}
        >
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
      </label>
    </div>
  );
}

export default Filters;
