import "./styles.css";
const defaultPlaceholder = "Search for books by author or title...";
const defaultType = "search";

//default - initial
const initialStateSearch = {
  placeholder: defaultPlaceholder,
  type: defaultType,
  className: "",
  id: "search",
  onInput: null,
};

export function createSearch(root, props = {}) {
  const { placeholder, type, className, id, onInput } = { ...initialStateSearch, ...props };
  const inputSearch = document.createElement("input");

  if (placeholder) {
    inputSearch.placeholder = placeholder;
  }
  if (type) {
    inputSearch.type = type;
  }
  if (id) {
    inputSearch.id = id;
  }
  if (className) {
    inputSearch.classList.add(className);
  }
  if (onInput) {
    inputSearch.addEventListener("input", (e) => {
      onInput(e.target.value, e);
    });
  }

  root.append(inputSearch);
  return inputSearch;
}
