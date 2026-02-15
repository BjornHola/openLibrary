import { favoriteCard } from "../components/FavoriteCard/index.js";
import fallback from "../assets/fallback-book.png";

export const KEY = "favorite";

// get store state
export function getFavoriteStore() {
  const favorites = localStorage.getItem(KEY);
  return favorites ? JSON.parse(favorites) : []; // with no error + UI show []
}

// push in store state
export function setFavoriteStore(book) {
  if (book) {
    localStorage.setItem(KEY, JSON.stringify(book));
  }
}
//add item
export function pushFavoriteToStore(book) {
  if (!book || !book.id) return;
  const store = getFavoriteStore();
  //check
  const contains = store.some((favorite) => book.id === favorite.id);
  // remove
  if (contains) {
    const copyStore = store.filter((favorite) => favorite.id !== book.id);
    setFavoriteStore(copyStore);
  } else {
    // add
    const copyStore = [...store, book];
    setFavoriteStore(copyStore);
  }
  renderFavoritesStore();
}
//ui render Favorites books container
export function renderFavoritesStore() {
  const container = document.body.querySelector(".favorite-books-container");
  if (!container) return;
  console.log(container); //
  container.innerHTML = "";
  const books = getFavoriteStore();
  console.log(books); //

  for (let book of books) {
    const bookData = {
      id: book.id,
      image: book.image ? book.image : fallback,
      title: book.title,
      author: book.author,
      year: book.year,
    };
    favoriteCard(container, { ...bookData });
  }
  return container;
}

export function isBookLiked(id) {
  const likedBooks = getFavoriteStore();
  const bookIsLiked = likedBooks.some((item) => item.id === id);
  return bookIsLiked; //boole
}

// handle the change of numbers of the liked books
export const handlerCounterBooks = () => {
  const current = getFavoriteStore().length;
  if (Number.isNaN(current) || !Number.isFinite(current)) return;
  const showQuantity = document.body.querySelector(".favorite-container__counter");
  if (!showQuantity) return;
  if (current === 0) {
    showQuantity.textContent = "Books saved: 0";
  } else {
    showQuantity.textContent = `Books saved: ${current}`;
  }
};
