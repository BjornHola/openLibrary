import "./styles.css";
const defaultLabel = "";

const initialStateButton = {
  label: defaultLabel,
  className: "",
  // onClick: null,
  type: "button",
};

export function createButton(root, props = {}) {
  // onCLick
  const { label, className, type } = { ...initialStateButton, ...props };
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

  // if(onClick) {
  //   button.addEventListener("click", (e)=> onClick(e));
  // }

  root.append(button);
  return button;
}
