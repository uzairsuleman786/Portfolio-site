// ══════════════════════════════════════════
//  STYLE SWITCHER — Dark/Light + Theme Color
// ══════════════════════════════════════════

// ── Toggle panel open/close ────────────────
const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
const styleSwitcher        = document.querySelector(".style-switcher");

styleSwitcherToggler.addEventListener("click", () => {
    styleSwitcher.classList.toggle("open");
});

// Close on scroll
window.addEventListener("scroll", () => {
    styleSwitcher.classList.remove("open");
});

// ── Theme Color (skin) ─────────────────────
const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    });
    localStorage.setItem("portfolioColor", color);

    // Update active swatch indicator
    document.querySelectorAll(".style-switcher .colors span").forEach(s => {
        s.style.outline = "";
        s.style.outlineOffset = "";
    });
    const active = document.querySelector(`.style-switcher .colors span[title="${CSS.escape(color.replace("color-","").trim()) ? color : color}"]`);
}

// ── Dark / Light Toggle ────────────────────
const dayNight = document.querySelector(".day-night");
const dayNightIcon = dayNight.querySelector("i");

function setTheme(theme) {
    if (theme === "light") {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
        dayNightIcon.classList.remove("fa-moon");
        dayNightIcon.classList.add("fa-sun");
    } else {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        dayNightIcon.classList.remove("fa-sun");
        dayNightIcon.classList.add("fa-moon");
    }
    localStorage.setItem("portfolioTheme", theme);
}

dayNight.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light");
    setTheme(isLight ? "dark" : "light");
});

// ── Restore saved preferences on load ─────
window.addEventListener("load", () => {
    // Restore theme
    const savedTheme = localStorage.getItem("portfolioTheme") || "dark";
    setTheme(savedTheme);

    // Restore color
    const savedColor = localStorage.getItem("portfolioColor") || "color-1";
    setActiveStyle(savedColor);
});
