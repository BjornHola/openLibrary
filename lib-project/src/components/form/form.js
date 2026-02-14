import { createSearch } from "../input/index.js";
import { createButton } from "../Button/index.js";
import "./styles.css";

const initialState = {
  action: "",
  name: "search",
  id: "form",
  onSubmit: null,
  className: "",
};

export function createForm(root, props = {}) {
  const { action, name, id, onSubmit, className, onInput, onSearch } = {
    ...initialState,
    ...props,
  };
  const form = document.createElement("form");

  if (className) {
    form.classList.add(className);
  }
  form.action = action;
  form.id = id;
  form.name = name;

  const input = createSearch(form, {
    className: "form__input",
    onInput,
    onSearch,
  });

  const formButton = createButton(form, {
    label: "Search",
    className: "form__button",
    type: "submit",
  });
  console.log(formButton); // check

  if (onSubmit) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      onSubmit(input.value, e);
      input.value = "";
    });
  }

  root.append(form);
  return form;
}
