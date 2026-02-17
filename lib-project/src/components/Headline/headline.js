import "./style.css";

export function createHeadline() {
  const headline = document.createElement("h1");
  headline.classList.add("headline");
  headline.textContent = "Discover your next great read";
  return headline;
}
