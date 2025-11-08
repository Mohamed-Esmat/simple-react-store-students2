import { useMemo, useState } from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import SearchBar from "./components/SeachBar";
import Filters from "./components/Filters";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import useProducts from "./hooks/useProducts";

function App() {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const { products, loading, error } = useProducts();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + (item?.qty || 0), 0)
    : 0;

  // useEffect(() => {
  //   let cancelled = false;
  //   async function fetchData() {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //       const response = await fetch("https://fakestoreapi.com/products");
  //       if (!response.ok) throw new Error("Failed to fetch products");
  //       const data = await response.json();
  //       if (!cancelled) setProducts(data);
  //     } catch (error) {
  //       if (!cancelled) setError(error.message || "Something went wrong");
  //     } finally {
  //       if (!cancelled) setLoading(false);
  //     }
  //   }

  //   fetchData();

  //   return () => {
  //     cancelled = true;
  //   };
  // }, []);

  // Derive categories from loaded products
  const categories = useMemo(() => {
    const set = new Set(products.map((product) => product.category));
    return ["all", ...set];
  }, [products]);

  // Apply search, filter and sorting (data binding + derived state)
  const visibleProducts = useMemo(() => {
    let items = [...products];

    if (category !== "all") {
      items = items.filter((item) => item.category === category);
    }

    if (query.trim()) {
      items = items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (sortBy === "price-asc") {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-desc") {
      items = [...items].sort(
        (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)
      );
    }

    return items;
  }, [products, category, query, sortBy]);

  const handleAddToCart = (productId) => {
    setCartItems((items) => {
      const list = Array.isArray(items) ? items : [];
      const index = list.findIndex((item) => item.product.id === productId);
      if (index !== -1) {
        // Increment quantity immutably
        return list.map((item, i) =>
          i === index ? { ...item, qty: (item.qty || 0) + 1 } : item
        );
      }
      const product = products.find((p) => p.id === productId);
      if (!product) return list;
      return [...list, { product, qty: 1 }];
    });
  };

  const handleDeleteProduct = (productId) => {
    setCartItems((items) => {
      const list = Array.isArray(items) ? items : [];
      return list.filter((item) => item.product.id !== productId);
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleDecrement = (productId) => {
    setCartItems((items) => {
      const list = Array.isArray(items) ? items : [];
      const index = list.findIndex((item) => item.product.id === productId);
      if (index !== -1) {
        const newItems = [...list];
        const currentQty = newItems[index]?.qty || 0;
        const nextQty = currentQty - 1;
        if (nextQty <= 0) {
          newItems.splice(index, 1);
        } else {
          newItems[index] = { ...newItems[index], qty: nextQty };
        }
        return newItems;
      } else {
        return list;
      }
    });
  };

  return (
    <>
      <div className={styles.app}>
        <Header
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen((prev) => !prev)}
        />

        <main className={styles.main}>
          <section className={styles.controls}>
            <SearchBar
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <Filters
              categories={categories}
              category={category}
              onCategoryChange={(e) => setCategory(e.target.value)}
              sortBy={sortBy}
              onSortChange={(e) => setSortBy(e.target.value)}
            />
          </section>

          {loading && <div className={styles.info}>Loading Products...</div>}
          {!loading && error && <div className={styles.error}>{error}</div>}
          {!loading && !error && visibleProducts.length !== 0 && (
            <ProductList
              products={visibleProducts}
              onAddToCart={handleAddToCart}
            />
          )}
        </main>

        {isCartOpen && (
          <Cart
            items={cartItems}
            onAdd={(productId) => handleAddToCart(productId)}
            onDelete={handleDeleteProduct}
            onClear={handleClearCart}
            onDecrement={handleDecrement}
            onClose={() => setIsCartOpen(false)}
          />
        )}
      </div>
    </>
  );
}

export default App;
