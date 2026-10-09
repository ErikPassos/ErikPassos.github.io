(function () {
  const CHAVE_TEMA = "tema-preferido";
  const elementoRaiz = document.documentElement;

  function obterPreferenciaSistema() {
    const prefereEscuro = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    return prefereEscuro ? "dark" : "light";
  }

  function obterTemaInicial() {
    const temaSalvo = localStorage.getItem(CHAVE_TEMA);

    if (temaSalvo === "light" || temaSalvo === "dark") {
      return temaSalvo;
    }

    return obterPreferenciaSistema();
  }

  function atualizarBotao(tema) {
    const botao = document.getElementById("alternar-tema");

    if (!botao) {
      return;
    }

    const icone = botao.querySelector(".tema-icone");
    const texto = botao.querySelector(".tema-texto");

    if (tema === "dark") {
      icone.textContent = "☀️";
      texto.textContent = "Tema claro";
      botao.setAttribute(
        "aria-label",
        "Ativar tema claro"
      );
      botao.setAttribute(
        "title",
        "Ativar tema claro"
      );
    } else {
      icone.textContent = "🌙";
      texto.textContent = "Tema escuro";
      botao.setAttribute(
        "aria-label",
        "Ativar tema escuro"
      );
      botao.setAttribute(
        "title",
        "Ativar tema escuro"
      );
    }
  }

  function aplicarTema(tema, salvarEscolha) {
    elementoRaiz.setAttribute("data-theme", tema);

    if (salvarEscolha) {
      localStorage.setItem(CHAVE_TEMA, tema);
    }

    atualizarBotao(tema);
  }

  const temaInicial = obterTemaInicial();

  aplicarTema(temaInicial, false);

  document.addEventListener("DOMContentLoaded", function () {
    atualizarBotao(
      elementoRaiz.getAttribute("data-theme")
    );

    const botao = document.getElementById("alternar-tema");

    if (!botao) {
      return;
    }

    botao.addEventListener("click", function () {
      const temaAtual =
        elementoRaiz.getAttribute("data-theme");

      const novoTema =
        temaAtual === "dark" ? "light" : "dark";

      aplicarTema(novoTema, true);
    });
  });

  const consultaTema = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

  consultaTema.addEventListener("change", function () {
    const temaSalvo = localStorage.getItem(CHAVE_TEMA);

    if (!temaSalvo) {
      aplicarTema(obterPreferenciaSistema(), false);
    }
  });
})();