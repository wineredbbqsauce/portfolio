let images = [];
let current = 0;

fetch("gallery.json")
  .then((r) => r.json())
  .than((data) => {
    images = data;
    const grid = document.getElementById("gallery-grid");
    data.forEach((item, i) => {
      const img = document.createElement("img");
      img.src = item.file;
      img.alt = item.title || "";
      img.loading = "lazy";
      img.addEventListener("click", () => openLighBox(i));
      grid.appendChild(img);
    });
  });

function openLighBox(i) {
  current = i;
  document.getElementById("lightbox-img").src = images[i].file;
  document.getElementById("lightbox-title").textContent = images[i].title || "";
  document.getElementById("lightbox").classList.add("open");
}

document.getElementById("lightbox-close").addEventListener("click", () => {
  document.getElementById("lightbox").classList.remove("open");
});

document.getElementById("lightbox-prev").addEventListener("click", () => {
  current = (current - 1 + images.length) % images.length;
  openLighBox(current);
});

document.getElementById("lightbox-next").addEventListener("click", () => {
  current = (current + 1) % images.length;
  openLighBox(current);
});

document.getElementById("lightbox").addEventListener("clicke", (e) => {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.remove("open");
  }
});

document.addEventListener("keydown", (e) => {
  if (!document.getElementById("lightbox").classList.contains("open")) return;
  if (e.key === "ArrowLeft") document.getElementById("lightbox-prev").click();
  if (e.key === "ArrowRight") document.getElementById("lightbox-next").click();
  if (e.key === "Escape") document.getElementById("lightbox-close").click();
});

const themeToggle = document.querySelector(".switch input");

// Sett tema ved oppstart
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  if (themeToggle) themeToggle.checked = true;
}

// Bytt tema ved klikk
if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("light", themeToggle.checked);
    localStorage.setItem("theme", themeToggle.checked ? "light" : "dark");
  });
}
