const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  item.querySelector("summary").addEventListener("click", function () {
    // Close all others BEFORE opening this one
    accordionItems.forEach((other) => {
      if (other !== item) {
        other.removeAttribute("open");
      }
    });
  });
});

sections.forEach((section) => {
  section.addEventListener("toggle", () => {
    if (section.open) {
      sections.forEach((other) => {
        if (other !== section) {
          other.removeAttribute("open");
        }
      });
    }
  });
});

//Event Hero - Add to calendar functionality

function updateCountdown() {
  const countdown = document.querySelector(".countdown");

  if (!countdown) return;

  const eventDate = new Date(countdown.dataset.date).getTime();

  console.log("Countdown date:", countdown.dataset.date);
  console.log("Event timestamp:", eventDate);

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

document.querySelectorAll(".accordion-item").forEach((item) => {
  item.addEventListener("toggle", function () {
    if (this.open) {
      document.querySelectorAll(".accordion-item").forEach((other) => {
        if (other !== this) {
          other.open = false;
        }
      });
    }
  });
});
