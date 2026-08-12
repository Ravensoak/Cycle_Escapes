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
