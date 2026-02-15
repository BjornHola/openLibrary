import { createForm } from "../../components/form/index.js";
import { createSearch } from "../../components/input/index.js";
import { createHeader } from "./Header/index.js";
import { createFooter } from "./Footer/index.js";
import { fetchBooks, initialParams } from "../../api/index.js";
import { createCard } from "../../components/Card/index.js";
import { favoriteContainer } from "../../components/FavoriteContainer/index.js";
import { showError, showNotFound, showStartSearch } from "../../helpers/index.js";
import {
  renderFavoritesStore,
  pushFavoriteToStore,
  isBookLiked,
  getFavoriteStore,
  handlerCounterBooks,
} from "../../utils/localStorage.js";
import fallback from "../../assets/fallback-book.png";
import "./styles.css";

export function getApp() {
  const app = document.getElementById("app");

  // current state of data
  let currentDocs = [];

  // handler for filter books
  let filteringValue = "";

  const header = createHeader(app, {
    className: "header",
    id: "header",
  });

  const headline = document.createElement("h1");
  headline.classList.add("headline");
  headline.textContent = "Discover your next great read";
  const motto = document.createElement("p");
  motto.classList.add("motto");
  motto.textContent =
    "Search millions of books, build your personal library, and never lose track of what to read next";

  // handler to close overlay
  const handleCloseOverlay = (e) => {
    if (!e.target.classList.contains("close")) return;
    const overlay = e.target.closest(".error, .loading, .not-found, .start-search");
    if (overlay) {
      overlay.classList.add("hidden");
      wrapperForBooks.innerHTML = `<div class="new-request">Put your new request...</div>`;
    }
  };

  // handler onSubmit event
  const handleSubmit = async (query) => {
    const q = query.trim();
    if (!q || q.length < 3) {
      showStartSearch();
      return;
    }
    filteringValue = "";
    filterInput.value = "";
    await loadState({ q: q });
  };

  const form = createForm(app, {
    action: "",
    name: "search",
    id: "form",
    onSubmit: handleSubmit,
    className: "form",
  });

  // handler for filter
  const handleFilter = (value) => {
    filteringValue = value?.trim().toLowerCase();
    if (!filteringValue.length === 0) {
      filteringValue = "";
      renderState();
      return;
    }
    renderState(); // re-render
  };

  const wrapperForFilterInput = document.createElement("div");
  wrapperForFilterInput.classList.add("filter-container");

  const filterInput = createSearch(wrapperForFilterInput, {
    placeholder: "Filter results by author",
    type: "text",
    className: "filter-input",
    id: "filter",
    onInput: handleFilter,
  });
  filterInput.setAttribute("name", "filter");

  // liked books + liked books
  const wrapperForMainContent = document.createElement("div");
  wrapperForMainContent.classList.add("content");
  // container for all books from API
  const wrapperForBooks = document.createElement("div");
  wrapperForBooks.classList.add("card-container");
  wrapperForBooks.addEventListener("click", handleCloseOverlay);

  // container for favorite books and counter
  const containerForFavorites = favoriteContainer();

  // handler to click button heart
  const handlerAddToFavorite = (event, bookData) => {
    const selectedButton = event.currentTarget;
    if (!selectedButton) return;

    pushFavoriteToStore(bookData);
    handlerCounterBooks();
    const liked = isBookLiked(bookData.id);
    selectedButton.classList.toggle("card__button_selected", liked);
  };

  //handler to click button heart in Favorites
  containerForFavorites.addEventListener("click", (e) => {
    const button = e.target.closest(".favorite-card__button");
    if (!button) return;
    const favoriteCard = button.closest(".favorite-card");
    if (!favoriteCard) return;

    const id = favoriteCard.id;
    if (!id) return;

    const booksFromFavorites = getFavoriteStore();
    const selectedBook = booksFromFavorites.find((favorite) => favorite.id === id);
    if (!selectedBook) return;
    pushFavoriteToStore(selectedBook);
    handlerCounterBooks();
    renderState();
  });

  const footer = createFooter(app, {
    className: "footer",
    id: "footer",
  });

  // render books container
  const loadState = async (params) => {
    wrapperForBooks.innerHTML = `
    <div class="loading">
    <p>Loading...</p>
    <button type="button" class="close">X</button>
    </div>
    `;

    try {
      // initial loading
      const state = await fetchBooks(params);
      console.log(state.data); // check
      console.log(state.data.docs); // check
      wrapperForBooks.innerHTML = "";

      if (state.error) {
        wrapperForBooks.innerHTML = `
    <details class="error">
    <summary>${state.error.name}</summary>
    <pre>${state.error.message}</pre>
    <button type="button" class="close">X</button>
    </details>
    `;
        currentDocs = [];
        return app;
      }

      const docs = state.data?.docs || [];

      if (!docs || docs.length === 0) {
        showNotFound();

        return app;
      }
      currentDocs = docs;
      // render current books form API ->
      renderState();
    } catch (error) {
      showError(error);
    }
  };

  // render UI - initial and then current state(All books) ->
  const renderState = () => {
    wrapperForBooks.innerHTML = "";

    const docs = currentDocs;
    // ...filter logic
    const filteredDocs = filteringValue
      ? docs.filter((book) =>
          (book.author_name ?? []).some((author) =>
            author.trim().toLowerCase().includes(filteringValue)
          )
        )
      : docs;

    if (!filteredDocs || filteredDocs.length === 0) {
      showNotFound();
      return;
    }

    for (let book of filteredDocs) {
      const bookData = {
        id: book.key?.replace("/works/", ""),
        image: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : fallback,
        title: book.title,
        author: book.author_name?.[0],
        year: book.first_publish_year,
      };
      let liked = isBookLiked(bookData.id);
      createCard(wrapperForBooks, {
        ...bookData,
        isLiked: liked,
        onClick: (e) => handlerAddToFavorite(e, bookData),
      });
    }
  };

  app.append(header, headline, motto, form, wrapperForFilterInput, wrapperForMainContent, footer);
  wrapperForMainContent.append(wrapperForBooks, containerForFavorites);
  // initial render favorite books
  renderFavoritesStore();
  // get initial numbers of liked books from LS
  handlerCounterBooks();

  // initial state of all books container
  loadState(initialParams);

  return app;
}
