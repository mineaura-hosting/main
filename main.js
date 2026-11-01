/* ==========================================================================
   MINEAURA HOSTING — BEHAVIOUR
   --------------------------------------------------------------------------
   Vanilla JS, no dependencies, no build step.
     1. Config + helpers
     2. Branding asset fallbacks (never show a broken image)
     3. Plan rendering
     4. Location rendering
     5. Discord purchase-link enforcement
     6. Navbar scroll state + scroll spy
     7. Mobile navigation
     8. Scroll reveal
     9. FAQ accordion
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------------------------------------- 1. CONFIG HELPERS */
  var CFG = window.MINEAURA_CONFIG || {};
  var DISCORD_URL = CFG.discordUrl || "https://discord.gg/QuMcykHhRR";

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------- 2. BRANDING ASSET FALLBACKS */
  /* If one of the official PNGs is not present yet, swap in a styled text
     wordmark instead of showing a broken image. Nothing else changes. */
  function applyAssetFallback(img) {
    if (img.dataset.fallbackApplied === "true") return;
    img.dataset.fallbackApplied = "true";

    var kind = img.dataset.asset;
    var text = img.dataset.fallbackText || img.alt || "";

    var replacement;
    if (kind === "mark") {
      replacement = document.createElement("span");
      replacement.className = "brand-fallback-mark";
      replacement.setAttribute("aria-hidden", "true");
      replacement.textContent = "MA";
    } else {
      replacement = document.createElement("span");
      replacement.className = "asset-fallback";
      replacement.textContent = text;
    }

    if (img.parentNode) img.parentNode.replaceChild(replacement, img);
  }

  function wireAssetFallbacks() {
    var images = document.querySelectorAll("img[data-asset]");
    Array.prototype.forEach.call(images, function (img) {
      img.addEventListener("error", function () {
        applyAssetFallback(img);
      });
      /* Images that already failed before this script ran */
      if (img.complete && img.naturalWidth === 0) applyAssetFallback(img);
    });
  }

  /* -------------------------------------------------------- 3. PLAN RENDER */
  function specRow(label, value, withCheck) {
    return (
      '<li><span class="spec-label">' +
      esc(label) +
      '</span><span class="spec-value">' +
      (withCheck
        ? '<svg aria-hidden="true"><use href="#i-check" /></svg>'
        : "") +
      esc(value) +
      "</span></li>"
    );
  }

  function planCard(plan) {
    var recommended = plan.recommended === true;
    var cta = plan.cta || CFG.purchaseCta || "Choose Plan";

    return (
      '<article class="plan-card reveal' +
      (recommended ? " is-recommended" : "") +
      '">' +
      (recommended ? '<span class="plan-badge">Recommended</span>' : "") +
      '<div class="plan-head">' +
      '<h3 class="plan-name">' +
      esc(plan.name) +
      "</h3>" +
      (plan.blurb ? '<p class="plan-blurb">' + esc(plan.blurb) + "</p>" : "") +
      "</div>" +
      '<div class="plan-price">' +
      '<span class="cur">$</span>' +
      '<span class="amount">' +
      esc(plan.price) +
      "</span>" +
      '<span class="period">' +
      esc(plan.period || "/mo") +
      "</span>" +
      "</div>" +
      '<ul class="plan-specs">' +
      specRow("RAM", plan.ram) +
      specRow("CPU", plan.cpu) +
      specRow("Storage", plan.storage) +
      specRow("Backups", plan.backups) +
      specRow("DDoS Protection", plan.ddos, true) +
      specRow("Server Location", plan.location) +
      "</ul>" +
      '<a class="btn btn-primary plan-cta" href="' +
      esc(DISCORD_URL) +
      '" data-discord>' +
      esc(cta) +
      "</a>" +
      "</article>"
    );
  }

  function renderPlans() {
    var groups = document.querySelectorAll("[data-plans]");
    Array.prototype.forEach.call(groups, function (group) {
      var key = group.getAttribute("data-plans");
      var set = CFG.plans && CFG.plans[key];
      if (!set || !set.plans) return;
      group.innerHTML = set.plans.map(planCard).join("");
    });
  }

  /* ---------------------------------------------------- 4. LOCATION RENDER */
  function renderLocations() {
    var grid = document.getElementById("locationGrid");
    var list = CFG.locations || [];
    if (!grid || !list.length) return;

    grid.innerHTML = list
      .map(function (loc) {
        return (
          '<article class="location-card reveal">' +
          '<span class="loc-badge" aria-hidden="true">' +
          (loc.flag ? '<span class="loc-flag">' + loc.flag + "</span>" : '<span class="loc-code">' + esc(loc.code) + "</span>") +
          "</span>" +
          '<div class="loc-main">' +
          '<h3 class="loc-name">' +
          esc(loc.name) +
          "</h3>" +
          '<p class="loc-region">' +
          esc(loc.region) +
          (loc.code ? " · " + esc(loc.code) : "") +
          "</p>" +
          '<div class="loc-meta">' +
          '<span class="loc-status"><span class="status-dot"></span>' +
          esc(loc.status) +
          "</span>" +
          '<span class="loc-latency"><svg aria-hidden="true"><use href="#i-activity" /></svg>Latency: ' +
          esc(loc.latency) +
          "</span>" +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  /* -------------------------------------- 5. PURCHASE LINKS → SAME-TAB DISCORD */
  /* Every purchase-related control points at the Discord invite, in the same
     browser tab. No checkout, no cart, no payment processing anywhere. */
  function wireDiscordLinks() {
    var links = document.querySelectorAll("a[data-discord]");
    Array.prototype.forEach.call(links, function (a) {
      a.setAttribute("href", DISCORD_URL);
      a.removeAttribute("target");
      a.removeAttribute("rel");
    });
  }

  /* ------------------------------------------- 6. NAVBAR STATE + SCROLL SPY */
  var SPY_IDS = ["home", "minecraft-hosting", "vps-hosting", "features", "locations", "support"];

  function initNavbar() {
    var header = document.getElementById("siteHeader");
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Scroll spy */
    var links = {};
    Array.prototype.forEach.call(
      document.querySelectorAll('.nav-link[href^="#"]'),
      function (a) {
        links[a.getAttribute("href").slice(1)] = a;
      }
    );

    var sections = SPY_IDS.map(function (id) {
      return document.getElementById(id);
    }).filter(Boolean);

    if (!sections.length || !("IntersectionObserver" in window)) return;

    var setActive = function (id) {
      Object.keys(links).forEach(function (key) {
        links[key].classList.toggle("is-active", key === id);
      });
    };

    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      spy.observe(s);
    });
  }

  /* -------------------------------------------------- 7. MOBILE NAVIGATION */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var drawer = document.getElementById("mobileNav");
    if (!toggle || !drawer) return;

    var header = document.getElementById("siteHeader");

    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      drawer.hidden = !open;
      if (header) header.classList.toggle("nav-open", open);
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    Array.prototype.forEach.call(drawer.querySelectorAll("a"), function (a) {
      a.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (
        toggle.getAttribute("aria-expanded") === "true" &&
        !drawer.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        setOpen(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1080) setOpen(false);
    });
  }

  /* ------------------------------------------------------- 8. SCROLL REVEAL */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      Array.prototype.forEach.call(items, function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    Array.prototype.forEach.call(items, function (el) {
      io.observe(el);
    });
  }

  /* -------------------------------------------------------- 9. FAQ ACCORDION */
  function initFaq() {
    var items = document.querySelectorAll(".faq-item");
    Array.prototype.forEach.call(items, function (item) {
      var btn = item.querySelector(".faq-q");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        Array.prototype.forEach.call(items, function (other) {
          other.classList.remove("open");
          var b = other.querySelector(".faq-q");
          if (b) b.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* --------------------------------------------------------------- BOOTSTRAP */
  function init() {
    renderPlans();
    renderLocations();
    wireDiscordLinks();
    wireAssetFallbacks();
    initNavbar();
    initMobileNav();
    initFaq();
    initReveal(); /* after dynamic content so injected cards animate too */
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
