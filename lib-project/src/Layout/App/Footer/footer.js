export const createFooter = (root, props = {}) => {
  const { className, id } = props;
  const footer = document.createElement("footer");
  if (className) {
    footer.classList.add(className);
  }
  if (id) {
    footer.id = id;
  }
  const text = document.createElement("p");
  text.classList.add("footer__text");

  const ref = document.createElement("a");
  ref.href = "https://openlibrary.org/";
  ref.rel = "noreferrer noopener";
  ref.textContent = "Open Library";

  root.append(footer);
  footer.append(text);
  text.append("Powered by ", ref);

  return footer;
};
