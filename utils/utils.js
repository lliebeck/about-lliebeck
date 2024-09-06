// utils.js
export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    // Überprüfe, ob das 'scrollend'-Event unterstützt wird
    if ("onscrollend" in window) {
      element.scrollIntoView({ behavior: "smooth" });

      window.addEventListener("scrollend", function handler() {
        window.location.hash = `#${id}`;
        window.removeEventListener("scrollend", handler);
      });
    } else {
      // Fallback: Verwende setTimeout, wie vorher erklärt
      element.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        window.location.hash = `#${id}`;
      }, 500); // Anpassung nötig
    }
  }
};
