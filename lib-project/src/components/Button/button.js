import "./styles.css";
const defaultLabel = "";

const initialStateButton = {
  label: defaultLabel,
  className: "",
  onclick: null,
  type: "button",
};

export function createButton(root, props = {}) {
  const { label, className, type, onclick } = { ...initialStateButton, ...props };
  const button = document.createElement("button");
  if (label) {
    button.textContent = label;
  }
  if (className) {
    button.classList.add(className);
  }

  if (type) {
    button.type = type;
  }

  if (onclick) {
    button.addEventListener("click", (e) => onclick(e));
  }

  root.append(button);
  return button;
}
