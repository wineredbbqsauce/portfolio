// Smooth reveal on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);
document.querySelectorAll(".category-card, .project-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});
const texts = [
  "Laster",
  "Laster assets",
  "Nesten ferdig",
  "Laster ned koffein",
  "Mixing kaffe mix",
  "Laster inn dårlige valg",
  "Utforsk mine prosjekter og kompetanser innen mat, teknologi og media.",
];

let currentIndex = 0;
let dotCount = 0;
let cycleCount = 0;
let isAnimating = false;
const textElement = document.getElementById("rotating-text");

function changeText() {
  if (isAnimating) return;
  isAnimating = true;

  // Start CSS slide-up animasjon
  textElement.classList.add("slide-up");

  // Vent til animasjonen er ferdig (0.5s)
  setTimeout(() => {
    // Bytt til neste tekst
    currentIndex = (currentIndex + 1) % texts.length;
    const currentText = texts[currentIndex];

    // Sjekk om det er siste tekst ("Utforsk...")
    if (currentIndex === texts.length - 1) {
      // Ingen prikker for "Utforsk..."
      textElement.textContent = currentText;

      // Bytt automatisk etter 3 sekunder
      setTimeout(() => {
        isAnimating = false;
        changeText();
      }, 5000);
    } else {
      // Alle andre tekster får prikker
      textElement.innerHTML = currentText + '<span id="dots">.</span>';
      isAnimating = false;
    }

    dotCount = 0;
    cycleCount = 0;

    // Fjern slide-up og start slide-in
    textElement.classList.remove("slide-up");
    textElement.classList.add("slide-in");

    // Fjern slide-in klassen etter animasjonen
    setTimeout(() => {
      textElement.classList.remove("slide-in");
    }, 500);
  }, 500);
}

// Animer prikkene
setInterval(() => {
  const currentDotsElement = document.getElementById("dots");
  if (currentDotsElement && !isAnimating) {
    dotCount = (dotCount + 1) % 4;
    currentDotsElement.textContent = ".".repeat(dotCount);

    // Når vi kommer tilbake til 0 (har vist alle 3 prikker)
    if (dotCount === 0) {
      cycleCount++;

      // Etter 2 komplette sykluser, trigger CSS-rullingen
      if (cycleCount >= 4) {
        cycleCount = 0;
        changeText();
      }
    }
  }
}, 400);

// IKKE kall changeText() her - la prikkene starte først!
