import { createForm } from "../../components/form/index.js";
import { createHeader } from "./Header/index.js";
import { createFooter } from "./Footer/index.js";
import { fetchBooks } from "../../api/index.js";
import { createCard } from "../../components/Card/index.js";
import fallback from "../../assets/fallback-book.png";
import "./styles.css";

export function getApp() {
  const app = document.getElementById("app");

  const header = createHeader(app, {
    className: "header",
    id: "header",
  });

  const form = createForm(app, {
    action: "",
    name: "search",
    id: "form",
    onSubmit: null,
    className: "form",
  });

  const wrapperForBooks = document.createElement("div");
  wrapperForBooks.classList.add("card-container");

  const footer = createFooter(app, {
    className: "footer",
    id: "footer",
  });

  // logic
  const renderState = async () => {
    wrapperForBooks.innerHTML = `
    <div class="loading">Loading...</div>
    `;

    try {
      // initial loading
      const state = await fetchBooks({ q: "harry", limit: "10" }); // hardcode
      console.log(state.data); // check
      console.log(state.data.docs); // check
      wrapperForBooks.innerHTML = "";

      if (state.loading) {
        wrapperForBooks.innerHTML = `
    <div class="loading"><p>Loading...</p></div>
    `;
      } else if (state.error) {
        wrapperForBooks.innerHTML = `
    <details class="error">
    <summary>${state.error.name}</summary>
    <pre>${state.error.message}</pre>
    </details>
    `;
      } else if (!state.data.docs || state.data.docs.length === 0) {
        console.log(state.data.docs); // check
        wrapperForBooks.innerHTML = `
      <div class="not-found"> <span>Books not found</span> </div>
      `;
        return app;
      }
      const books = state.data?.docs;
      console.log(books); // check
      for (let book of books) {
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
    } catch (error) {
      wrapperForBooks.innerHTML = `<details class="error">
    <summary>${error.name}</summary>
    <pre>${error.message}</pre>
    </details>`;
    }
  };

  app.append(header, form, wrapperForBooks, footer);

  renderState();

  return app;
}
