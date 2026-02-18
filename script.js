// ===== Theme toggle (Star <-> Moon) =====
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  // Your exact filenames:
  // light -> Star.png, dark -> moon.tiff
  themeIcon.src = theme === "dark" ? "./assets/moon.tiff" : "./assets/Star.png";

  localStorage.setItem("h2h-theme", theme);
}

const savedTheme = localStorage.getItem("h2h-theme");
setTheme(savedTheme || "light");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  setTheme(current === "light" ? "dark" : "light");
});


// ===== Info panel that appears above clicked button =====
const infoPanel = document.getElementById("infoPanel");
const panelTitle = document.getElementById("panelTitle");
const panelContent = document.getElementById("panelContent");

// Put your real text here anytime
const PANEL_DATA = {
  about: {
    title: "About",
    html: `
      Heart to Heart is a pen pal club connecting high school students and nursing home residents
      through handwritten letters—building friendship, comfort, and joy across generations.
    `
  },
  rules: {
    title: "Rules",
    html: `
      Be kind and respectful. No sharing private info (addresses, phone numbers, socials).
      Keep messages appropriate, positive, and safe. We’ll provide prompts if you need ideas.
    `
  },
  contact: {
    title: "Contact",
    html: `
      Email: <b>ADD-YOUR-EMAIL-HERE</b><br/>
      Interest form: <b>COMING SOON</b>
    `
  }
};

function openPanel(key, anchorBtn) {
  const data = PANEL_DATA[key];
  if (!data) return;

  panelTitle.textContent = data.title;
  panelContent.innerHTML = data.html;

  // Show first so we can measure height
  infoPanel.style.display = "block";

  // Position above clicked button (centered)
  const btnRect = anchorBtn.getBoundingClientRect();
  const panelRect = infoPanel.getBoundingClientRect();

  const spacing = 12; // gap above button
  const top = window.scrollY + btnRect.top - panelRect.height - spacing;
  const left = window.scrollX + (btnRect.left + btnRect.width / 2) - (panelRect.width / 2);

  // Clamp so it doesn't go off screen
  const minLeft = 12;
  const maxLeft = window.scrollX + document.documentElement.clientWidth - panelRect.width - 12;

  infoPanel.style.top = `${Math.max(12, top)}px`;
  infoPanel.style.left = `${Math.max(minLeft, Math.min(left, maxLeft))}px`;
}

function closePanel() {
  infoPanel.style.display = "none";
}

// Buttons are the ones with onclick="openPanel('about')"... etc.
// We'll attach listeners so positioning works.
document.querySelectorAll(".iconButton").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("onclick")?.match(/openPanel\('(.+)'\)/)?.[1];

    // If we can't read it, fall back to label text
    const fallbackKey = btn.textContent.trim().toLowerCase();
    const panelKey = key || fallbackKey;

    // Toggle: if panel open and same title, close
    if (infoPanel.style.display === "block" && panelTitle.textContent.toLowerCase() === panelKey) {
      closePanel();
      return;
    }

    openPanel(panelKey, btn);
  });
});

// Close if user clicks outside the panel and outside the buttons
document.addEventListener("click", (e) => {
  const clickedPanel = e.target.closest("#infoPanel");
  const clickedButton = e.target.closest(".iconButton");
  if (!clickedPanel && !clickedButton) closePanel();
});

// Reposition if window resizes and panel is open
window.addEventListener("resize", () => {
  if (infoPanel.style.display !== "block") return;

  // Find which panel is open based on title
  const openKey = panelTitle.textContent.toLowerCase();
  const btn = Array.from(document.querySelectorAll(".iconButton")).find(b =>
    b.textContent.trim().toLowerCase() === openKey
  );
  if (btn) openPanel(openKey, btn);
});


// ===== Games modal =====
const gamesModal = document.getElementById("gamesModal");

function openGames() {
  gamesModal.style.display = "flex";
}
function closeGames() {
  gamesModal.style.display = "none";
}

// Close games if you click outside the box
gamesModal.addEventListener("click", (e) => {
  const clickedInside = e.target.closest(".gamesContent");
  if (!clickedInside) closeGames();
});

// Make these functions available to your HTML onclick handlers
window.openPanel = () => {};  // we handle via listeners above
window.closePanel = closePanel;
window.openGames = openGames;
window.closeGames = closeGames;
