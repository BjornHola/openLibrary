import { createButton } from "../Button";
import fallbackCover from "../../assets/fallback-book.png";
import "./styles.css";

const initialState = {
  id: Math.floor(Math.random() * 12345 + 1),
  image: fallbackCover,
  title: "Default",
  author: "Default",
  year: "Default",
};

export function createCard(root, props = {}) {
  const { id, image, title, author, year } = { ...initialState, ...props };
  console.log("CARD PROPS:", { id, image, title, author, year }); //

  const card = document.createElement("div");
  card.classList.add("card");
  if (id) {
    card.id = id;
  }

  const imageDiv = document.createElement("div");
  imageDiv.classList.add("card__image");

  const cardImage = document.createElement("img");
  if (image) {
    cardImage.src = image;
  }
  if (title) cardImage.alt = title;
  cardImage.classList.add("card__image_medium");

  const cardTitle = document.createElement("p");
  if (title) {
    cardTitle.textContent = title;
  }
  cardTitle.classList.add("card__title");

  const cardAuthor = document.createElement("p");

  if (author) {
    cardAuthor.textContent = author;
  }
  cardAuthor.classList.add("card__author");

  const cardYear = document.createElement("p");
  if (year) {
    cardYear.textContent = year;
  }
  cardYear.classList.add("card__year");

  const buttonFavorite = createButton(card, {
    label: null,
    className: "card__button",
    // onClick: onClick,
    type: "button",
  });
  buttonFavorite.id = Math.floor((Date.now() / Math.random) * 12345);

  root.append(card);
  card.append(imageDiv, cardTitle, cardAuthor, cardYear);
  imageDiv.append(cardImage);
  return card;
}
