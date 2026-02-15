import "./style.css";

export const favoriteCard = (rootElem, props = {}) => {
  const { id, image, title, author, year, onClick } = props;

  const bookCardContainer = document.createElement("div");
  bookCardContainer.classList.add("favorite-card");
  if (id) {
    bookCardContainer.id = id;
  }

  const coverContainer = document.createElement("div");
  coverContainer.classList.add("favorite-card__cover-container");

  const cover = document.createElement("img");
  cover.classList.add("favorite-card__cover");
  if (image) {
    cover.src = image;
  }

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("favorite-card__description");

  const heartButton = document.createElement("button");
  heartButton.classList.add("favorite-card__button");
  if (onClick) {
    heartButton.addEventListener("click", () => onClick());
  }

  const bookTitle = document.createElement("p");
  bookTitle.classList.add("favorite-card__description_title");
  if (title) {
    bookTitle.textContent = title;
  }

  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("favorite-card__description_author");
  if (author) {
    bookAuthor.textContent = author;
  }

  const bookYear = document.createElement("p");
  bookYear.classList.add("favorite-card__description_year");
  if (year) {
    bookYear.textContent = year;
  }

  rootElem.appendChild(bookCardContainer);
  bookCardContainer.append(coverContainer, descriptionContainer, heartButton);
  coverContainer.appendChild(cover);
  descriptionContainer.append(bookTitle, bookAuthor, bookYear);

  return bookCardContainer;
};
