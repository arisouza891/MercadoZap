// ===============================
// PROTEÇÃO DO DASHBOARD
// ===============================
const logado = localStorage.getItem("adminLogado");

if (!logado) {
  window.location.href = "index.html";
}

// ===============================
// LOGOUT
// ===============================
const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("adminLogged");
  window.location.href = "index.html";
});

const productsBtn = document.getElementById("products-btn");

productsBtn.addEventListener("click", () => {
  window.location.href = "products.html";
});
