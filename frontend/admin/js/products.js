const API_URL = "/products";
const listDiv = document.getElementById("product-list");

function voltar() {
  window.location.href = "dashboard.html";
}

// =======================
// LISTAR PRODUTOS
// =======================
function loadProducts() {
  fetch(API_URL)
    .then(res => res.json())
    .then(products => {
      listDiv.innerHTML = "";

      products.forEach(p => {
        const div = document.createElement("div");
        div.className = "product-row";

        div.innerHTML = `
          <strong>${p.name}</strong> - R$ ${p.price.toFixed(2)}
          <br>
          <button onclick="editProduct(${p.id}, '${p.name}', ${p.price})">✏️</button>
          <button onclick="deleteProduct(${p.id})">🗑</button>
        `;

        listDiv.appendChild(div);
      });
    });
}

// =======================
// ADICIONAR
// =======================
function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;

  if (!name || !price) {
    alert("Preencha nome e preço");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, image })
  }).then(() => {
    clearForm();
    loadProducts();
  });
}

// =======================
// EDITAR
// =======================
function editProduct(id, name, price) {
  const newName = prompt("Novo nome:", name);
  const newPrice = prompt("Novo preço:", price);

  if (!newName || !newPrice) return;

  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName, price: newPrice })
  }).then(loadProducts);
}

// =======================
// DELETAR
// =======================
function deleteProduct(id) {
  if (!confirm("Deseja excluir este produto?")) return;

  fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  }).then(loadProducts);
}

// =======================
// UTIL
// =======================
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";
}

loadProducts();
