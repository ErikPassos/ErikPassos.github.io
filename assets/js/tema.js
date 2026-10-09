(function () {
  "use strict";

  const CHAVE_TEMA = "tema-preferido";
  const TEMA_CLARO = "light";
  const TEMA_ESCURO = "dark";

  const raiz = document.documentElement;

  function obterTemaAtual() {
    return raiz.getAttribute("data-theme") || TEMA_CLARO;
  }

  function salvarTema(tema) {
    try {
      localStorage.setItem(CHAVE_TEMA, tema);
    } catch (erro) {
      console.warn(
        "Não foi possível salvar a preferência de tema.",
        erro
      );
    }
  }

  function atualizarCorDoNavegador(tema) {
    const metaCor = document.getElementById(
      "meta-cor-tema"
    );

    if (!metaCor) {
      return;
    }

    const cor =
      tema === TEMA_ESCURO
        ? "#0d1117"
        : "#155799";

    metaCor.setAttribute("content", cor);
  }

  function atualizarBotao(tema) {
    const botao = document.getElementById(
      "alternar-tema"
    );

    if (!botao) {
      return;
    }

    const icone = botao.querySelector(
      ".tema-icone"
    );

    const texto = botao.querySelector(
      ".tema-texto"
    );

    const modoEscuro = tema === TEMA_ESCURO;

    if (modoEscuro) {
      if (icone) {
        icone.textContent = "☀️";
      }

      if (texto) {
        texto.textContent = "Tema claro";
      }

      botao.setAttribute(
        "aria-label",
        "Ativar tema claro"
      );

      botao.setAttribute(
        "title",
        "Ativar tema claro"
      );

      botao.setAttribute(
        "aria-pressed",
        "true"
      );
    } else {
      if (icone) {
        icone.textContent = "🌙";
      }

      if (texto) {
        texto.textContent = "Tema escuro";
      }

      botao.setAttribute(
        "aria-label",
        "Ativar tema escuro"
      );

      botao.setAttribute(
        "title",
        "Ativar tema escuro"
      );

      botao.setAttribute(
        "aria-pressed",
        "false"
      );
    }
  }

  function aplicarTema(tema, persistir) {
    const temaValido =
      tema === TEMA_ESCURO
        ? TEMA_ESCURO
        : TEMA_CLARO;

    raiz.setAttribute(
      "data-theme",
      temaValido
    );

    atualizarBotao(temaValido);
    atualizarCorDoNavegador(temaValido);

    if (persistir) {
      salvarTema(temaValido);
    }
  }

  function alternarTema() {
    const temaAtual = obterTemaAtual();

    const novoTema =
      temaAtual === TEMA_ESCURO
        ? TEMA_CLARO
        : TEMA_ESCURO;

    aplicarTema(novoTema, true);
  }

  function iniciar() {
    const botao = document.getElementById(
      "alternar-tema"
    );

    atualizarBotao(obterTemaAtual());
    atualizarCorDoNavegador(obterTemaAtual());

    if (!botao) {
      console.error(
        "O botão de tema não foi encontrado."
      );
      return;
    }

    botao.addEventListener(
      "click",
      alternarTema
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      iniciar
    );
  } else {
    iniciar();
  }
})();