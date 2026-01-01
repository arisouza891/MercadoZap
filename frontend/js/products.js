const API = '/products';
const list = document.getElementById('product-list');

function checkAuth() {
  if (localStorage.getItem('adminLogged') !== 'true') {
    window.location.href = '/admin';
  }
}
checkAuth();

function loadProducts() {
  fetch(API)
    .then(res => res.json())
    .then(products => {
      list.innerHTML = '';
      products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <strong>${p.name}</strong> - R$ ${p.price.toFixed(2)}
          <button onclick="edit(${p.id}, '${p.name}', ${p.price})">✏️</button>
          <button onclick="remove(${p.id})">🗑</button>
        `;
        list.appendChild(div);
      });
    });
}

function createProduct() {
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const image = document.getElementById('image').value;

  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, image })
  }).then(loadProducts);
}

function edit(id, name, price) {
  const newName = prompt('Nome:', name);
  const newPrice = prompt('Preço:', price);

  fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName, price: newPrice })
  }).then(loadProducts);
}

function remove(id) {
  if (!confirm('Excluir produto?')) return;

  fetch(`${API}/${id}`, { method: 'DELETE' })
    .then(loadProducts);
}

function logout() {
  localStorage.removeItem('adminLogged');
  window.location.href = '/admin';
}

loadProducts();
