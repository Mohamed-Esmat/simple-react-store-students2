<div align="center">

# Simple React Store

An educational mini e‑commerce catalog built with React 19 and Vite 7. Students use it to practice core React concepts: state, derived data, custom hooks, composition, and immutable updates.

![React](https://img.shields.io/badge/React-19.x-61dafb?logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-7.x-646cff?logo=vite&logoColor=white)

</div>

## 🚀 What You Will Learn

- Fetching data with side effects (`useEffect`) via a reusable custom hook (`useProducts`).
- Managing local component state (search query, filters, sorting, cart, modal toggle).
- Deriving state efficiently with `useMemo` (filtered & sorted product list, categories, cart count).
- Immutably updating nested data structures (increment/decrement cart quantities).
- Conditional rendering for loading and error states.
- Basic component composition and prop drilling vs. potential refactors.

## 🧩 Features

- Product list loaded from [FakeStore API](https://fakestoreapi.com/).
- Search by product title.
- Category filter (includes dynamic category derivation from fetched data).
- Sorting by price (asc/desc) and rating (desc).
- Add to cart, increment quantity, decrement/auto-remove at zero, clear cart.
- Cart badge showing total quantity.
- Toggleable cart panel.
- Graceful loading and error messaging.

## 📂 Project Structure (Key Files)

```
src/
	App.jsx            # Root component: orchestrates state & derived data
	hooks/
		useProducts.js   # Custom hook for fetching products & managing loading/error
	components/
		Header.jsx       # Top bar with cart badge
		SeachBar.jsx     # Controlled search input (component name kept as-is in code)
		Filters.jsx      # Category + sort selectors
		ProductList.jsx  # Renders list of ProductCard
		ProductCard.jsx  # Individual product presentation + add button
		Cart.jsx         # Cart drawer with item controls
```

## 🛠 Tech Stack

| Layer      | Choice      | Notes                        |
| ---------- | ----------- | ---------------------------- |
| Build Tool | Vite        | Fast HMR & modern dev server |
| UI Library | React 19    | Latest features & APIs       |
| Styling    | CSS Modules | Scoped styles per component  |
| Linting    | ESLint 9    | Enforces code quality        |

## ✅ Prerequisites

Ensure you have:

- Node.js 18+ (recommend latest LTS)
- npm 9+ (comes with Node; or use pnpm/yarn if you adapt scripts)

Check versions:

```bash
node -v
npm -v
```

## ▶️ Getting Started

```bash
git clone <your-fork-url>
cd react-essentials/react-1
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## 🧪 Common Exercises / Extensions

Try these to extend learning:

1. Replace prop drilling with React Context for cart operations.
2. Add optimistic UI updates or a simulated latency with `setTimeout` in the fetch.
3. Introduce a debounce to the search input (implement a `useDebounce` hook).
4. Persist `cartItems` to `localStorage` (add `useEffect` + hydration logic).
5. Add a min/max price range filter.
6. Add a sort option for alphabetical title.
7. Create a `useCart` hook abstracting cart logic.
8. Migrate to TypeScript (rename files with `.tsx` and add types for product & cart item).
9. Add unit tests (e.g., with Vitest) for cart reducers.
10. Add pagination or infinite scroll.

## 🧠 Key Concepts Illustrated

| Concept               | Where                                        | Why It Matters                                         |
| --------------------- | -------------------------------------------- | ------------------------------------------------------ |
| Custom Hook           | `useProducts`                                | Encapsulates fetch side effects & loading/error state  |
| Derived State         | `categories`, `visibleProducts`, `cartCount` | Avoid duplicating source of truth                      |
| Immutable Updates     | Cart handlers                                | Prevent subtle bugs & enable predictable re-renders    |
| Defensive Programming | Cart reducers                                | Guards prevent runtime crashes (e.g., non-array state) |
| Conditional Rendering | Loading/Error/ProductList                    | Keep UI resilient & user-friendly                      |

## 🧺 Cart Logic Overview

The cart is an array: `[{ product, qty }]`.

Operations:

- Add: If product exists, increment; else append new entry.
- Decrement: Reduce quantity; remove when it hits 0.
- Delete: Remove item directly.
- Clear: Reset to empty array.

Edge cases handled:

- Non-array previous state (defensive normalization).
- Missing product ID (gracefully no-op).

## 🔍 Sorting & Filtering Pipeline

1. Start with fetched `products`.
2. Filter by `category` if not `all`.
3. Filter by `query` (case-insensitive title match).
4. Sort based on `sortBy` option.
5. Result memoized via `useMemo` to avoid unnecessary recomputations.

## 🐛 Troubleshooting

| Symptom                                                  | Cause                                | Fix                                                          |
| -------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------ |
| "Cannot read properties of undefined (reduce/findIndex)" | Updater returned `undefined`         | Ensure updater returns array (already fixed in this version) |
| API returns 429 / network error                          | FakeStore rate limit or connectivity | Retry later or mock data locally                             |
| Styles not applied                                       | Wrong className or module import     | Confirm `import styles from './*.module.css'`                |
| Cart badge not updating                                  | Mutable state change                 | Use immutable update (map/spread) as shown                   |

## 📦 Production Build

```bash
npm run build
npm run preview
```

Outputs optimized assets to `dist/`.

## 🔒 Notes on Data

Data comes from a public demo API and is not guaranteed stable. For deterministic classroom sessions, consider snapshotting `products` to a local JSON file and swapping the fetch for a static import.

## 🛡 Suggested Next Refactors

- Extract a `ProductFilters` component combining search + filters.
- Introduce error boundary for unexpected rendering errors.
- Add skeleton loaders for better perceived performance.

---

Happy coding! If you extend this project, document your additions under a new `CHANGELOG.md` or an "Extensions" section here.
