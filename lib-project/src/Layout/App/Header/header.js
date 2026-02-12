import "./styles.css";

export const createHeader = (root, props = {}) => {
  const { className, id } = props;
  const header = document.createElement("header");
  header.id = id;
  if (className) {
    header.classList.add(className);
  }
  root.append(header);

  const logo = document.createElement("div");
  logo.classList.add("header__logo");

  const title = document.createElement("h3");
  title.classList.add("header__title");
  title.textContent = "The Library";

  const caption = document.createElement("p");
  caption.classList.add("header__caption");
  caption.textContent = "Discover yur next favorite book";

  header.append(logo, title, caption);

  return header;
};
