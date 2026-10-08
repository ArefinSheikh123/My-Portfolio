/* Progressive enhancement. All content and links work without JavaScript. */
(() => {
  "use strict";
  document.documentElement.classList.add("js");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("navigation");
  const mobile = window.matchMedia("(max-width: 700px)");
  function closeMenu(returnFocus = false) {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    if (returnFocus) menuButton.focus();
  }
  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      navigation.classList.toggle("is-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") closeMenu(true);
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".site-header")) closeMenu();
    });
    navigation.addEventListener("focusout", () => {
      requestAnimationFrame(() => {
        if (!document.activeElement.closest(".site-header")) closeMenu();
      });
    });
    mobile.addEventListener("change", () => closeMenu());
  }

  const cards = [...document.querySelectorAll(".work-card")];
  const filters = [...document.querySelectorAll("[data-filter]")];
  const count = document.querySelector(".project-count");
  filters.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      filters.forEach(filter => {
        const selected = filter === button;
        filter.classList.toggle("active", selected);
        filter.setAttribute("aria-pressed", String(selected));
      });
      let visible = 0;
      cards.forEach(card => {
        const show = category === "all" || card.dataset.category === category;
        card.hidden = !show;
        if (show) {
          visible += 1;
          card.classList.remove("is-pending");
        }
      });
      if (count) count.textContent = String(visible).padStart(2, "0") + (visible === 1 ? " SELECTED PROJECT" : " SELECTED PROJECTS");
    });
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("is-pending");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll(".reveal").forEach(element => {
      // Keep the initial viewport visible and animate only incoming content.
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add("is-pending");
        observer.observe(element);
      }
    });
    reducedMotion.addEventListener("change", () => {
      if (reducedMotion.matches) {
        document.querySelectorAll(".is-pending").forEach(element => element.classList.remove("is-pending"));
        observer.disconnect();
      }
    });
  }

  const sectionLinks = [...document.querySelectorAll('.nav-link[href^="#"]')];
  const observedSections = sectionLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && observedSections.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach(link => {
          const active = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-15% 0px -60% 0px", threshold: 0 });
    observedSections.forEach(section => spy.observe(section));
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
