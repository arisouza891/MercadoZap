function protegerAdmin() {
  const logado = localStorage.getItem("adminLogado");

  if (!logado) {
    window.location.href = "index.html";
  }
}

function logout() {
  localStorage.removeItem("adminLogado");
  window.location.href = "index.html";
}
