import "./style.css";

export function createMotto() {
  const motto = document.createElement("p");
  motto.classList.add("motto");
  motto.textContent =
    "Search millions of books, build your personal library, and never lose track of what to read next";
  return motto;
}
