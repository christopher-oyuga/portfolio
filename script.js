// ==============================
// DARK/LIGHT MODE TOGGLE
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const modeToggleBtn = document.getElementById("modeToggle");
  const toggleIcon = document.getElementById("toggleIcon");

  if (modeToggleBtn && toggleIcon) {
    // Load saved theme OR default to light
    const savedTheme = localStorage.getItem("theme") || "light";

    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      toggleIcon.classList.replace("fa-toggle-off", "fa-toggle-on");
    } else {
      document.body.classList.remove("dark-mode"); // ✅ force light by default
      toggleIcon.classList.replace("fa-toggle-on", "fa-toggle-off");
    }

    // Toggle handler
    modeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");

      toggleIcon.classList.toggle("fa-toggle-off", !isDark);
      toggleIcon.classList.toggle("fa-toggle-on", isDark);

      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  } else {
    console.warn("⚠️ Dark mode toggle button or icon not found in DOM.");
  }

  // ==============================
  // TYPING EFFECT
  // ==============================
  console.log("✅ Typing effect is active!");
  const roles = ["Frontend Developer.", "Graphic Designer.", "Animator."];
  const typingText = document.getElementById("typing-text");

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let speed = 120;

  function typeEffect() {
    if (!typingText) return;
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }
    } else {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeEffect, isDeleting ? 80 : speed);
  }
  typeEffect();

  // ==============================
  // DOCS TOGGLE
  // ==============================
  const docToggleBtn = document.getElementById("docToggle");
  const docContainer = document.getElementById("docContainer");

  if (docToggleBtn && docContainer) {
    docToggleBtn.addEventListener("click", () => {
      console.log("Toggle clicked ✅");
      docContainer.classList.toggle("show");
    });
  }

  // ==============================
  // DOCS CARD OPEN
  // ==============================
  const docCards = document.querySelectorAll(".doc-card");
  docCards.forEach(card => {
    card.addEventListener("click", () => {
      const docPath = card.getAttribute("data-doc");
      console.log("Card clicked:", docPath);

      if (docPath) {
        window.open(docPath, "_blank", "noopener,noreferrer");
      }
    });
  });

  // ==============================
  // CV BUTTON
  // ==============================
  const cvBtn = document.getElementById("cvBtn");
  if (cvBtn) {
    cvBtn.addEventListener("click", () => {
      console.log("CV button clicked ✅");
      window.open("docs/Christopher Oyuga.O cv.pdf", "_blank", "noopener,noreferrer");
    });
  }

  // ==============================
  // CONTACT FORM POPUP
  // ==============================
  const form = document.getElementById("contactForm");
  const popup = document.getElementById("thankPopup");
  const closeBtn = document.getElementById("closePopup");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
        });
        if (popup) popup.classList.add("show");
        form.reset();
      } catch (error) {
        alert("❌ Something went wrong, please try again.");
        console.error(error);
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (popup) popup.classList.remove("show");
    });
  }
});
