export function showError(error) {
  const container = document.body.querySelector(".card-container");
  if (!container) return;
  container.innerHTML = `
      <details class="error">
    <summary>${error.name}</summary>
    <pre>${error.message}</pre>
    <button type="button" class="close">X</button>
    </details>`;
}

export function showNotFound() {
  const container = document.body.querySelector(".card-container");
  if (!container) return;
  container.innerHTML = `
      <div class="not-found">
        <span>Books not found</span>
        <button type="button" class="close">X</button>
      </div>
    `;
}

export function showStartSearch() {
  const container = document.body.querySelector(".card-container");
  if (!container) return;
  container.innerHTML = `
      <div class="start-search">
      Enter 3 and more symbols to start search
      <button type="button" class="close">X</button>
      </div>
      `;
}
