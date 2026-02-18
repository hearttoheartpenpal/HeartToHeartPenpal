// Theme toggle: background only
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

function setTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  themeIcon.src = theme === "dark" ? "./assets/moon.png" : "./assets/sun.png";
  themeLabel.textContent = theme === "dark" ? "Dark" : "Light";
  localStorage.setItem("h2h-theme", theme);
}

// load saved theme
setTheme(localStorage.getItem("h2h-theme") || "light");

themeBtn.addEventListener("click", () => {
  const cur = document.documentElement.getAttribute("data-theme") || "light";
  setTheme(cur === "light" ? "dark" : "light");
});

// For now: prevent “dead clicks” confusion
document.getElementById("gamesBtn").addEventListener("click", () => {
  alert("Games menu coming next 💗");
});

["aboutBtn","rulesBtn","contactBtn"].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener("click", () => {
    alert("This page popup comes after the layout is perfect 💗");
  });
});
