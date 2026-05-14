// Dropdown interests
function toggleInterest(header) {
  const card = header.closest(".interest-card");
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
