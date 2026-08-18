// =========================================================
// ACCORDION
// =========================================================

const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  item.addEventListener("toggle", function () {
    if (this.open) {
      accordionItems.forEach((other) => {
        if (other !== this) {
          other.removeAttribute("open");
        }
      });
    }
  });
});

// =========================================================
// COUNTDOWN
// =========================================================

function updateCountdown() {
  const countdown = document.querySelector(".countdown");

  if (!countdown) return;

  const eventDate = new Date(countdown.dataset.date).getTime();
  const now = Date.now();
  const diff = eventDate - now;

  if (diff <= 0) {
    countdown.innerHTML = "<strong>The ride has started!</strong>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  countdown.querySelector("#days").textContent = days;
  countdown.querySelector("#hours").textContent = hours;
  countdown.querySelector("#minutes").textContent = minutes;
}

updateCountdown();

setInterval(updateCountdown, 60000);

const routeMapThumb = document.getElementById("routeMapThumb");
const routeLightbox = document.getElementById("routeLightbox");
const routeLightboxImage = document.getElementById("routeLightboxImage");
const routeLightboxClose = document.getElementById("routeLightboxClose");

routeMapThumb.addEventListener("click", function (e) {
  e.preventDefault();

  routeLightboxImage.src = this.href;
  routeLightbox.classList.add("active");

  document.body.style.overflow = "hidden";
});

function closeRouteLightbox() {
  routeLightbox.classList.remove("active");
  routeLightboxImage.src = "";
  document.body.style.overflow = "";
}

routeLightboxClose.addEventListener("click", closeRouteLightbox);

routeLightbox.addEventListener("click", function (e) {
  if (e.target === routeLightbox) {
    closeRouteLightbox();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeRouteLightbox();
  }
});
/* =========================================================
   HORIZONTAL TOUR TABS
========================================================= */

const tourTabs = document.querySelectorAll(".tour-tab");
const tourTabContents = document.querySelectorAll(".tour-tab-content");

tourTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    /* Remove active state from all tabs */
    tourTabs.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });

    /* Hide all tab content */
    tourTabContents.forEach((content) => {
      content.classList.remove("active");
    });

    /* Activate selected tab */
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    /* Show selected content */
    const targetContent = document.getElementById(target);

    if (targetContent) {
      targetContent.classList.add("active");
    }
  });
});
