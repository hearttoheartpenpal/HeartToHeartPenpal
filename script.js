// Theme toggle (safe version)
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  if (themeIcon) themeIcon.src = theme === "dark" ? "./assets/moon.png" : "./assets/sun.png";
  if (themeLabel) themeLabel.textContent = theme === "dark" ? "Dark" : "Light";

  localStorage.setItem("h2h-theme", theme);
}

setTheme(localStorage.getItem("h2h-theme") || "light");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(cur === "light" ? "dark" : "light");
  });
}

// Games button (safe)
const gamesBtn = document.getElementById("gamesBtn");
if (gamesBtn) {
  gamesBtn.addEventListener("click", () => {
    // placeholder for later
    console.log("Games clicked");
  });
}
