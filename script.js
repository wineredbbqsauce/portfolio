// Dropdown interests
function toggleInterest(header) {
  const card = header.closest(".interest-card");
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // på mobil; åpne / lukke bare det kortet som klikkes
    const isOpen = card.classList.contains("open");
    document
      .querySelectorAll(".interest-card.open")
      .forEach((c) => c.classList.remove("open"));
    if (!isOpen) card.classList.add("open");
  } else {
    // PÅ dekstop åpne hele rad
    const row = card.closest(".interests-row");
    const isOpen = card.classList.contains("open");
    row
      .querySelectorAll(".interest-card")
      .forEach((c) => c.classList.remove("open"));
    if (!isOpen)
      row
        .querySelectorAll(".interest-card")
        .forEach((c) => c.classList.add("open"));
  }
}

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings a bit
        const siblings = [...entry.target.parentElement.children].filter((el) =>
          el.classList.contains("reveal"),
        );
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add("visible"), idx * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

reveals.forEach((el) => observer.observe(el));

// Hamburger
const hamburger = document.getElementById("hamburger");
const nav = document.querySelector("nav");

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      nav.classList.remove("open");
    });
  });
}
