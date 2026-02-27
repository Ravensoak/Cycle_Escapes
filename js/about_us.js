/* =========================================================
  Run on tab click
========================================================== */
/* Wait for the html page to be fully loaded */
document.addEventListener("DOMContentLoaded", function () {
  /* Collect all tab and content panels */
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");
  /* Attach click handlers for each tab */
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active states
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      // Activate selected tab
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });
});
