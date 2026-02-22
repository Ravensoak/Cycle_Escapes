/* =========================================================
  Run on tab click
========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetId = this.getAttribute("data-tab");
      const targetContent = document.getElementById(targetId);

      if (!targetContent) return;

      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      this.classList.add("active");
      targetContent.classList.add("active");
    });
  });
});
