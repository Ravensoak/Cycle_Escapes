// ===============================
// ACCORDION (only one open)
// ===============================
const sections = document.querySelectorAll(".accordion-item");

sections.forEach((section) => {
  section.addEventListener("toggle", () => {
    if (section.open) {
      sections.forEach((other) => {
        if (other !== section) {
          other.open = false;
        }
      });
    }
  });
});

// ===============================
// COUNTDOWN
// ===============================
function updateCountdown() {
  const countdown = document.querySelector(".countdown");
  if (!countdown) return;

  const eventDate = new Date(countdown.dataset.date).getTime();
  const now = new Date().getTime();
  const diff = eventDate - now;

  if (diff <= 0) {
    countdown.innerHTML = "<strong>The ride has started!</strong>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
}

updateCountdown();
setInterval(updateCountdown, 60000);
