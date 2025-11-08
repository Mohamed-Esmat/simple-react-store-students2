import classes from "./SearchBar.module.css";

function SearchBar({ value, onChange }) {
  return (
    <label className={classes.wrapper}>
      <span className={classes.label}>Search Products...</span>
      <input
        type="text"
        className={classes.input}
        placeholder="Type to search"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export default SearchBar;
