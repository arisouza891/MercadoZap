const loginBtn = document.getElementById("login-btn");
const errorMsg = document.getElementById("error");

loginBtn.addEventListener("click", () => {
  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (user === "admin" && pass === "123") {
    localStorage.setItem("adminLogado", "true");
    window.location.href = "dashboard.html";
  } else {
    errorMsg.classList.remove("hidden");
  }
});
