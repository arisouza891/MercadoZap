// proteção de acesso
if (localStorage.getItem('adminLogged') !== 'true') {
  window.location.href = '/admin';
}

const logoutBtn = document.getElementById('logout-btn');

logoutBtn.onclick = () => {
  localStorage.removeItem('adminLogged');
  window.location.href = '/admin';
};
