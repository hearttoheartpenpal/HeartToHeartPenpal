const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

function setTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);

  themeIcon.src = theme === "dark"
    ? "assets/moon.png"
    : "assets/sun.png";

  themeLabel.textContent = theme === "dark" ? "Dark" : "Light";

  localStorage.setItem("theme", theme);
}

setTheme(localStorage.getItem("theme") || "light");

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "light" ? "dark" : "light");
});
