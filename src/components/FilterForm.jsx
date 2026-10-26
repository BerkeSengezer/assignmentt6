export default function FilterForm({ filter, onFilterChange }) {
  return (
    <form
      className="filter-form"
      onSubmit={(event) => event.preventDefault()}
    >
      <label htmlFor="title-filter">
        Filter posts by title
      </label>

      <input
        id="title-filter"
        type="search"
        placeholder="Search titles..."
        value={filter}
        onChange={(event) => onFilterChange(event.target.value)}
      />
    </form>
  );
}
