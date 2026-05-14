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
