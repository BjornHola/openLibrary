import { createForm } from "../../components/form/index.js";
import { createSearch } from "../../components/input/index.js";
import { createHeader } from "./Header/index.js";
import { createFooter } from "./Footer/index.js";
import { fetchBooks, initialParams } from "../../api/index.js";
import { createCard } from "../../components/Card/index.js";
import { showError, showNotFound, showStartSearch } from "../../helpers/index.js";
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

  const wrapperForBooks = document.createElement("div");
  wrapperForBooks.classList.add("card-container");
  wrapperForBooks.addEventListener("click", handleCloseOverlay);

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
      // render currentDocs ->
      renderState();
    } catch (error) {
      showError(error);
    }
  };

  // render  initial and then current state ->
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
      createCard(wrapperForBooks, {
        id: book.key?.replace("/works/", ""),
        image: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : fallback,
        title: book.title,
        author: book.author_name?.[0],
        year: book.first_publish_year,
      });
    }
  };

  app.append(header, headline, motto, form, wrapperForFilterInput, wrapperForBooks, footer);

  loadState(initialParams);

  return app;
}
