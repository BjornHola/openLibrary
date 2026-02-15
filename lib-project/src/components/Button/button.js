import "./styles.css";
const defaultLabel = "";

const initialStateButton = {
  label: defaultLabel,
  className: "",
  onClick: null,
  type: "button",
};

export function createButton(root, props = {}) {
  const { label, className, type, onClick } = { ...initialStateButton, ...props };
  const button = document.createElement("button");
  if (label) {
    button.textContent = label;
  }
  if (className) {
    className.split(" ").forEach((name) => {
      if (name) {
        button.classList.add(name);
      }
    });
  }

  if (type) {
    button.type = type;
  }

  if (onClick) {
    button.addEventListener("click", (e) => onClick(e));
  }

  root.append(button);
  return button;
}
