document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const siteNav = document.querySelector("[data-site-nav]");
  const submenuButtons = document.querySelectorAll("[data-submenu-toggle]");
  const revealItems = document.querySelectorAll(".reveal");
  const faqItems = document.querySelectorAll(".faq-item");
  const contactForm = document.querySelector("[data-contact-form]");
  const responseBox = document.querySelector("[data-form-response]");
  const mandateHint = document.querySelector("[data-mandate-hint]");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
      if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  submenuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".has-submenu");
      if (!item) {
        return;
      }

      const willOpen = !item.classList.contains("is-open");
      submenuButtons.forEach((other) => {
        const otherItem = other.closest(".has-submenu");
        if (otherItem && otherItem !== item) {
          otherItem.classList.remove("is-open");
          other.setAttribute("aria-expanded", "false");
        }
      });

      item.classList.toggle("is-open", willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
    });
  });

  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("is-active");
      const parent = link.closest(".has-submenu");
      if (parent) {
        const trigger = parent.querySelector("[data-submenu-toggle]");
        if (trigger) {
          trigger.classList.add("is-active");
        }
      }
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => observer.observe(item));

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) {
        return;
      }

      faqItems.forEach((other) => {
        if (other !== item) {
          other.open = false;
        }
      });
    });
  });

  if (contactForm) {
    if (mandateHint) {
      mandateHint.textContent = "Durch diese Anfrage entsteht kein Mandatsverhältnis.";
    }

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (responseBox) {
        responseBox.textContent = "Dies ist ein statischer Prototyp. Ihre Nachricht wurde nicht versendet. Durch diese Anfrage entsteht kein Mandatsverhältnis.";
        responseBox.classList.add("is-visible");
      }
    });
  }
});
