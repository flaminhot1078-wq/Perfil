document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  const nav = document.getElementById("siteNav");
  const navToggle = document.getElementById("navToggle");
  const themeToggle = document.getElementById("themeToggle");
  const year = document.getElementById("year");

  const fakeSend = document.getElementById("fakeSend");
  const sendNote = document.getElementById("sendNote");

  // Año en el footer
  if (year) year.textContent = new Date().getFullYear();

  // Menú móvil
  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Tema claro/oscuro
  function setTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme"); // oscuro por defecto
    }
    localStorage.setItem("theme", theme);
    updateThemeButton();
  }

  function updateThemeButton() {
    if (!themeToggle) return;
    const isLight = root.getAttribute("data-theme") === "light";
    themeToggle.textContent = isLight ? "Oscuro" : "Claro";
    themeToggle.setAttribute("aria-label", isLight ? "Cambiar a tema oscuro" : "Cambiar a tema claro");
  }

  // Cargar tema guardado
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    setTheme(saved);
  } else {
    // Si nunca se guardó, usa oscuro por defecto
    setTheme("dark");
  }

  // Cambiar tema al clicar
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      setTheme(isLight ? "dark" : "light");
    });
  }

  // Mensaje del formulario
  if (fakeSend && sendNote) {
    fakeSend.addEventListener("click", () => {
      sendNote.textContent = "Gracias por tu mensaje. Me pondré en contacto lo antes posible.";
      setTimeout(() => (sendNote.textContent = ""), 4000);
    });
  }
});
