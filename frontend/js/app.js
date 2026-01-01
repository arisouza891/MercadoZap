const API_URL = '/products';
const WHATSAPP_NUMBER = '5584994406951';
const restoreOrderBtn = document.getElementById('restore-order');


let lastOrder = JSON.parse(localStorage.getItem('lastOrder')) || null;

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const productsDiv = document.getElementById('products');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const closeCart = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const toast = document.getElementById('toast');
const customerNameInput = document.getElementById('customer-name');


fetch(API_URL)
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>R$ ${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
          Adicionar
        </button>
      `;
      productsDiv.appendChild(div);
    });
  });

// carrega nome salvo (se existir)
const savedCustomerName = localStorage.getItem('customerName');
if (savedCustomerName) {
  customerNameInput.value = savedCustomerName;
}


function addToCart(id, name, price) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  saveCart();
  showToast();
}


function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  cartItems.innerHTML = '';
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;

    const div = document.createElement('div');
    div.className = 'cart-item';

    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        <small>R$ ${item.price.toFixed(2)} un.</small>
      </div>

      <div class="cart-controls">
        <button onclick="decreaseQty(${index})">−</button>
        <span>${item.qty}</span>
        <button onclick="increaseQty(${index})">+</button>
        <button onclick="removeItem(${index})">🗑</button>
      </div>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = count;
}


cartBtn.onclick = () => {
  cartModal.classList.remove('hidden');
  updateCartUI();
};

closeCart.onclick = () => {
  cartModal.classList.add('hidden');
};

checkoutBtn.onclick = () => {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio');
    return;
  }

  const customerName = customerNameInput.value.trim();

  if (!customerName) {
    alert('Por favor, informe seu nome');
    customerNameInput.focus();
    return;
  }
  
  // 💾 salva nome do cliente
  localStorage.setItem('customerName', customerName);

  // 💾 salva o último pedido
  lastOrder = [...cart];
  localStorage.setItem('lastOrder', JSON.stringify(lastOrder));
  
  let message = '🛒 Pedido - MercadoZap\n\n';
  message += `👤 Cliente: ${customerName}\n\n`;

  cart.forEach(item => {
    message += `• ${item.name}\n`;
    message += `  ${item.qty}x  R$ ${item.price.toFixed(2)} un.\n`;
  });

  message += `\nTotal: R$ ${cartTotal.textContent}`;
 

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');

  // 🧹 limpa carrinho
  cart = [];
  localStorage.removeItem('cart');
  updateCartUI();

  // limpa nome

  cartModal.classList.add('hidden');

  alert('Pedido enviado!\nCaso queira alterar, use "Restaurar último pedido".');
};


function increaseQty(index) {
  cart[index].qty++;
  saveCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

restoreOrderBtn.onclick = () => {
  if (!lastOrder || lastOrder.length === 0) {
    alert('Não há pedido para restaurar');
    return;
  }

  cart = [...lastOrder];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  cartModal.classList.remove('hidden');
};

function showToast() {
  toast.classList.remove('hidden');
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hidden');
  }, 1000);
}
