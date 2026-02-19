/* =========================================================
  Site SCRIPT
  - FLOATING REFRESH BUTTON (PWA standalone only)
  - LIGHTBOX FUNCTIONALITY
  - DYNAMIC COMPONENT LOADING (e.g., footer)
========================================================== */ /* =========================================================
  FLOATING REFRESH BUTTON (PWA standalone only)
========================================================== */
const refreshBtn = document.getElementById("refreshButton");
let hideTimer;

if (refreshBtn && window.matchMedia("(display-mode: standalone)").matches) {
  refreshBtn.style.display = "flex";
  setTimeout(() => refreshBtn.classList.add("visible"), 100);

  refreshBtn.addEventListener("click", () => window.location.reload());

  function resetHideTimer() {
    refreshBtn.classList.add("visible");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => refreshBtn.classList.remove("visible"), 5000);
  }

  ["mousemove", "scroll", "touchstart"].forEach((evt) =>
    document.addEventListener(evt, resetHideTimer),
  );

  resetHideTimer();
}

/* =========================================================
  LIGHTBOX FUNCTIONALITY
==========================================================*/
let redirectTarget = null;

function openLightbox(imgSrc, text, targetUrl) {
  const overlay = document.getElementById("lightbox");
  if (!overlay) return;

  const content = overlay.querySelector(".lightbox-content");
  const img = overlay.querySelector("#lightbox-img");
  const txt = overlay.querySelector("#lightbox-text");

  img.src = imgSrc;
  txt.innerHTML = text;
  redirectTarget = targetUrl;

  overlay.classList.add("show");
  content.classList.remove("animate");
  void content.offsetWidth; // trigger reflow
  content.classList.add("animate");
}

function closeLightbox() {
  const overlay = document.getElementById("lightbox");
  if (!overlay) return;

  overlay.classList.remove("show");

  if (redirectTarget) {
    window.open(redirectTarget, "_blank");
    redirectTarget = null;
  }
}

// Attach triggers to all buttons with class "lightbox-trigger"
document.querySelectorAll(".lightbox-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.getAttribute("data-img");
    const text = button.getAttribute("data-text");
    const target = button.getAttribute("data-target");
    openLightbox(img, text, target);
  });
});

/* =========================================================
  DYNAMIC COMPONENT LOADING (e.g., footer)
========================================================== */
function loadComponent(selector, url, fallbackHTML = "", callback) {
  const container = document.querySelector(selector);
  if (!container) return;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      return response.text();
    })
    .then((html) => {
      container.innerHTML = html;
      if (typeof callback === "function") callback();
    })
    .catch((error) => {
      console.warn(`Component load failed: ${url}`, error);
      container.innerHTML = fallbackHTML;
      if (typeof callback === "function") callback();
    });
}

// Load footer dynamically
loadComponent(
  "#footer-placeholder",
  "footer.html",
  `
  <footer>
    <div class="footer-content">
      <span class="footer-text">© C2C Rides</span>
    </div>
  </footer>
`,
);

loadComponent(
  "#nav-placeholder",
  "nav.html",
  "", // optional fallback HTML
  initNavigationMenu, // callback to run AFTER nav loads
);
loadComponent(
  "#navindex-placeholder",
  "navindex.html",
  "", // optional fallback HTML
  initNavigationMenu, // callback to run AFTER nav loads
);

function initNavigationMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".menu-overlay");

  // If this nav doesn't include a mobile menu, skip mobile logic
  if (!toggle || !mobileMenu || !overlay) {
    console.log("Loaded nav without mobile menu — skipping mobile init");
    return;
  }

  // Mobile menu logic (only runs when elements exist)
  toggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    overlay.classList.remove("active");
  });
}

// Open help modals
document.querySelectorAll(".help-icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    const modalId = icon.getAttribute("data-help");
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = "block";
  });
});

// Close when clicking X
document.querySelectorAll(".close-help").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".help-modal").style.display = "none";
  });
});

// Close when clicking outside content
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("help-modal")) {
    e.target.style.display = "none";
  }
});

const isTouchDevice = window.matchMedia("(hover: none)").matches;

if (isTouchDevice) {
  const modal = document.getElementById("helpModal");
  const modalTitle = document.getElementById("helpModalTitle");
  const modalText = document.getElementById("helpModalText");
  const closeBtn = document.querySelector(".close-help");

  document.querySelectorAll(".help-icon").forEach((icon) => {
    icon.addEventListener("click", () => {
      modalTitle.textContent = icon.getAttribute("data-title");
      modalText.textContent = icon.getAttribute("data-help");
      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

//Event Hero - Add to calendar functionality

function updateCountdown() {
  const eventDate = new Date("June 4, 2027 09:00:00").getTime();
  const now = new Date().getTime();
  const diff = eventDate - now;

  if (diff <= 0) {
    document.querySelector(".countdown").innerHTML =
      "<strong>The ride has started!</strong>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
}

updateCountdown();
setInterval(updateCountdown, 60000);
