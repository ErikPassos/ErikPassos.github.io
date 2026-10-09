(function () {
  "use strict";

  var STORAGE_KEY = "site-theme";
  var LIGHT = "light";
  var DARK = "dark";
  var root = document.documentElement;

  function currentTheme() {
    return root.getAttribute("data-theme") === DARK ? DARK : LIGHT;
  }

  function updateButton(theme) {
    var button = document.getElementById("theme-toggle");
    if (!button) return;

    var icon = button.querySelector(".theme-toggle__icon");
    var text = button.querySelector(".theme-toggle__text");
    var darkActive = theme === DARK;

    if (icon) icon.textContent = darkActive ? "☀️" : "🌙";
    if (text) text.textContent = darkActive ? "Tema claro" : "Tema escuro";

    button.setAttribute("aria-label", darkActive ? "Ativar tema claro" : "Ativar tema escuro");
    button.setAttribute("title", darkActive ? "Ativar tema claro" : "Ativar tema escuro");
    button.setAttribute("aria-pressed", darkActive ? "true" : "false");

    var meta = document.getElementById("theme-color");
    if (meta) meta.setAttribute("content", darkActive ? "#0d1117" : "#155799");
  }

  function applyTheme(theme, persist) {
    var validTheme = theme === DARK ? DARK : LIGHT;
    root.setAttribute("data-theme", validTheme);
    updateButton(validTheme);

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, validTheme);
      } catch (error) {
        console.warn("Não foi possível salvar a preferência de tema.");
      }
    }
  }

  function start() {
    var button = document.getElementById("theme-toggle");
    updateButton(currentTheme());

    if (!button) {
      console.error("Botão de tema não encontrado.");
      return;
    }

    button.addEventListener("click", function () {
      applyTheme(currentTheme() === DARK ? LIGHT : DARK, true);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
}());
