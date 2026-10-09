(function () {
  "use strict";

  const CHAVE_TEMA = "tema-preferido";
  const TEMA_CLARO = "light";
  const TEMA_ESCURO = "dark";

  const raiz = document.documentElement;

  function obterTemaDoSistema() {
    const consulta = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    return consulta.matches
      ? TEMA_ESCURO
      : TEMA_CLARO;
  }

  function obterTemaSalvo() {
    try {
      const temaSalvo =
        localStorage.getItem(CHAVE_TEMA);

      if (
        temaSalvo === TEMA_CLARO ||
        temaSalvo === TEMA_ESCURO
      ) {
        return temaSalvo;
      }
    } catch (erro) {
      console.warn(
        "Não foi possível consultar o tema salvo.",
        erro
      );
    }

    return null;
  }

  function obterTemaAtual() {
    const temaAtual =
      raiz.getAttribute("data-theme");

    if (
      temaAtual === TEMA_CLARO ||
      temaAtual === TEMA_ESCURO
    ) {
      return temaAtual;
    }

    return TEMA_CLARO;
  }

  function salvarTema(tema) {
    try {
      localStorage.setItem(
        CHAVE_TEMA,
        tema
      );
    } catch (erro) {
      console.warn(
        "Não foi possível salvar o tema.",
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

    metaCor.setAttribute(
      "content",
      cor
    );
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

    const estaEscuro =
      tema === TEMA_ESCURO;

    if (estaEscuro) {
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

  function aplicarTema(
    tema,
    deveSalvar
  ) {
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

    if (deveSalvar) {
      salvarTema(temaValido);
    }
  }

  function alternarTema() {
    const temaAtual = obterTemaAtual();

    const novoTema =
      temaAtual === TEMA_ESCURO
        ? TEMA_CLARO
        : TEMA_ESCURO;

    aplicarTema(
      novoTema,
      true
    );
  }

  function iniciarSeletorDeTema() {
    const temaInicial =
      obterTemaSalvo() ||
      obterTemaAtual() ||
      obterTemaDoSistema();

    aplicarTema(
      temaInicial,
      false
    );

    const botao = document.getElementById(
      "alternar-tema"
    );

    if (botao) {
      botao.addEventListener(
        "click",
        alternarTema
      );
    }

    const consultaSistema =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

    function acompanharSistema() {
      const temaSalvo = obterTemaSalvo();

      if (!temaSalvo) {
        aplicarTema(
          obterTemaDoSistema(),
          false
        );
      }
    }

    if (consultaSistema.addEventListener) {
      consultaSistema.addEventListener(
        "change",
        acompanharSistema
      );
    } else if (consultaSistema.addListener) {
      consultaSistema.addListener(
        acompanharSistema
      );
    }
  }

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      iniciarSeletorDeTema
    );
  } else {
    iniciarSeletorDeTema();
  }
})();