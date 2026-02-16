export const KEY_THEME = "THEME";

export function startWithTheme(button) {
  const last = localStorage.getItem(KEY_THEME);
  if (!last) return;

  if (last === "dark") {
    document.documentElement.classList.add("dark");
    if (button) button.textContent = "🌙 Dark";
  }
  if (last === "light") {
    document.documentElement.classList.remove("dark");
    if (button) button.textContent = "☀ Light";
  }
}
