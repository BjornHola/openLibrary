import "./style.css";

export const favoriteContainer = () => {
  const container = document.createElement("div");
  container.classList.add("favorite-container");

  const topHalf = document.createElement("div");
  topHalf.classList.add("favorite-container__top");
  const bottomHalf = document.createElement("div");
  bottomHalf.classList.add("favorite-books-container");

  const divForIcon = document.createElement("div");
  divForIcon.classList.add("favorite-container__svg");
  const divForText = document.createElement("div");
  divForText.classList.add("favorite-container__text");

  const headlineForFavorite = document.createElement("h4");
  headlineForFavorite.classList.add("favorite-container__headline");
  headlineForFavorite.textContent = "Favorites";
  const counter = document.createElement("p");
  counter.classList.add("favorite-container__counter");
  counter.textContent = "Books saved: 0";

  if (container) {
    container.append(topHalf, bottomHalf);
  }
  topHalf.append(divForIcon, divForText);
  divForText.append(headlineForFavorite, counter);

  return container;
};
