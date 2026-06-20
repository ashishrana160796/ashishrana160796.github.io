(function () {
  var root = document.documentElement;
  var typingTimer = null;

  function preferredTheme() {
    var saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    return "light";
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    var icon = document.querySelector("[data-theme-icon]");
    if (icon) icon.textContent = theme === "dark" ? "☾" : "☼";
  }

  function setLanguage(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);

    document.querySelectorAll("[data-lang-switch]").forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-lang-switch") === lang);
    });

    startTyping();
  }

  function startTyping() {
    var target = document.querySelector(".typing-line");
    if (!target) return;

    if (typingTimer) window.clearTimeout(typingTimer);

    var lang = root.getAttribute("data-lang") || "en";
    var lines = (target.getAttribute("data-lines-" + lang) || "").split("|").filter(Boolean);
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!lines.length) return;
    if (reducedMotion) {
      target.textContent = lines[0];
      return;
    }

    var lineIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function tick() {
      var line = lines[lineIndex];
      target.textContent = line.slice(0, charIndex);

      if (!deleting && charIndex < line.length) {
        charIndex += 1;
        typingTimer = window.setTimeout(tick, 46);
        return;
      }

      if (!deleting && charIndex === line.length) {
        deleting = true;
        typingTimer = window.setTimeout(tick, 1400);
        return;
      }

      if (deleting && charIndex > 0) {
        charIndex -= 1;
        typingTimer = window.setTimeout(tick, 24);
        return;
      }

      deleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
      typingTimer = window.setTimeout(tick, 260);
    }

    tick();
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function initPublications() {
    var belt = document.querySelector(".publication-belt");
    if (!belt) return;

    var panels = document.querySelectorAll("[data-publication-panel]");
    function openPanel(id) {
      panels.forEach(function (panel) {
        var active = panel.getAttribute("data-publication-panel") === id;
        panel.hidden = !active;
        panel.classList.toggle("is-active", active);
      });
      belt.classList.add("is-slided");
      var detail = document.querySelector(".publication-detail");
      if (detail) detail.focus();
    }

    document.querySelectorAll("[data-publication-target]").forEach(function (card) {
      card.addEventListener("click", function () {
        openPanel(card.getAttribute("data-publication-target"));
      });
    });

    var back = document.querySelector(".publication-return");
    if (back) {
      back.addEventListener("click", function () {
        belt.classList.remove("is-slided");
        panels.forEach(function (panel) {
          panel.hidden = true;
          panel.classList.remove("is-active");
        });
      });
    }
  }

  function initInterests() {
    var units = Array.prototype.slice.call(document.querySelectorAll(".interest-unit"));
    var logos = Array.prototype.slice.call(document.querySelectorAll(".interest-logo"));
    var buttons = Array.prototype.slice.call(document.querySelectorAll(".interest-button"));
    if (!units.length) return;

    function activate(index) {
      [units, logos, buttons].forEach(function (group) {
        group.forEach(function (item, itemIndex) {
          item.classList.toggle("active-interest", itemIndex === index);
        });
      });
    }

    logos.concat(buttons).forEach(function (item) {
      item.addEventListener("click", function () {
        activate(logos.concat(buttons).indexOf(item) % units.length);
      });
    });

    var next = document.querySelector(".interest-control-next");
    var prev = document.querySelector(".interest-control-prev");

    if (next) {
      next.addEventListener("click", function () {
        var current = units.findIndex(function (unit) { return unit.classList.contains("active-interest"); });
        activate((current + 1 + units.length) % units.length);
      });
    }

    if (prev) {
      prev.addEventListener("click", function () {
        var current = units.findIndex(function (unit) { return unit.classList.contains("active-interest"); });
        activate((current - 1 + units.length) % units.length);
      });
    }
  }

  function initEmailCopy() {
    var button = document.querySelector(".email-copy");
    if (!button) return;

    var original = button.textContent;
    button.addEventListener("click", function () {
      var email = button.getAttribute("data-email-user") + "@" + button.getAttribute("data-email-domain");
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(email).then(function () {
        button.textContent = root.getAttribute("data-lang") === "de" ? "Kopiert" : "Copied";
        window.setTimeout(function () {
          button.textContent = original;
        }, 1200);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setTheme(preferredTheme());
    setLanguage(localStorage.getItem("lang") === "de" ? "de" : "en");

    document.querySelectorAll("[data-lang-switch]").forEach(function (button) {
      button.addEventListener("click", function () {
        setLanguage(button.getAttribute("data-lang-switch"));
      });
    });

    var themeToggle = document.querySelector("[data-theme-toggle]");
    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    }

    initSmoothScroll();
    initPublications();
    initInterests();
    initEmailCopy();
  });
})();
