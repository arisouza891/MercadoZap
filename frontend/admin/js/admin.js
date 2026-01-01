const loginBtn = document.getElementById('login-btn');
const error = document.getElementById('error');

loginBtn.onclick = () => {
  const user = document.getElementById('user').value;
  const password = document.getElementById('password').value;

  // login simples (por enquanto)
 if (user === 'admin' && password === '1234') {
  localStorage.setItem('adminLogged', 'true');
  window.location.href = '/admin/dashboard.html';
  }

};
