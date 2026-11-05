
// ==========================================
// PAGE-SCRIPT.JS
// Shared interactions for inner pages
// ==========================================


// HAMBURGER NAVIGATION MENU

(() => {

  const toggle   = document.getElementById("menuToggle");
  const menu     = document.getElementById("siteMenu");
  const closeBtn = document.getElementById("menuClose");

  if (!toggle || !menu || !closeBtn) return;

  function openMenu() {
    menu.classList.add("is-visible");
    requestAnimationFrame(() => {
      menu.classList.add("is-open");
    });
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    menu.addEventListener("transitionend", function hide() {
      menu.classList.remove("is-visible");
      menu.removeEventListener("transitionend", hide);
    });
    toggle.focus();
  }

  toggle.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
    }
  });

  menu.addEventListener("click", (e) => {
    if (e.target === menu) closeMenu();
  });

})();


// SMOOTH PAGE TRANSITIONS

(() => {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      link.target === "_blank" ||
      link.hasAttribute("download") ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }

    try {
      const url = new URL(link.href, window.location.href);
      const isInternal =
        url.origin === window.location.origin ||
        (window.location.protocol === "file:" && url.protocol === "file:");

      if (!isInternal) return;
      if (url.pathname === window.location.pathname && url.hash) return;

      e.preventDefault();
      document.body.classList.add("page-leaving");

      setTimeout(() => {
        window.location.href = link.href;
      }, 200);
    } catch (err) {
      // Fallback
    }
  });

  window.addEventListener("pageshow", () => {
    document.body.classList.remove("page-leaving");
  });
})();


// ==========================================
// STILLFORM-INSPIRED SCROLL REVEALS (INNER PAGES)
// ==========================================

(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const targets = document.querySelectorAll(
    '.features-grid, .faq-category, .inner-coming-soon-inner, .extra-quote-banner'
  );

  targets.forEach((target) => {
    target.classList.add('stillform-reveal');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  targets.forEach((target) => observer.observe(target));
})();

