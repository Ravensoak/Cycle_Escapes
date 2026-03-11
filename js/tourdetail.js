const sections = document.querySelectorAll(".tour-section");

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
