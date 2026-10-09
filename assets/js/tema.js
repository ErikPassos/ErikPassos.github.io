(function () {
  const CHAVE_TEMA = "tema-preferido";
  const elementoRaiz = document.documentElement;

  function obterPreferenciaSistema() {
    const consulta = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    return consulta.matches ? "dark" : "light";
  }

  function obterTemaAtual() {
    return (
      elementoRaiz.getAttribute("data-theme") ||
      "light"
    );
  }

  function obterTemaInicial() {
    try {
      const temaSalvo =
        localStorage.getItem(CHAVE_TEMA);

      if (
        temaSalvo === "light" ||
        temaSalvo === "dark"
      ) {
        return temaSalvo;
      }
    } catch (erro) {
      return obterPreferenciaSistema();
    }

    return obterPreferenciaSistema();
  }

  function atualizarBotao(tema) {
    const botao =
      document.getElementById("alternar-tema");

    if (!botao) {
      return;
    }

    const icone =
      botao.querySelector(".tema-icone");

    const texto =
      botao.querySelector(".tema-texto");

    if (tema === "dark") {
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
    }
  }

  function aplicarTema(tema, salvarEscolha) {
    elementoRaiz.setAttribute(
      "data-theme",
      tema
    );

    if (salvarEscolha) {
      try {
        localStorage.setItem(
          CHAVE_TEMA,
          tema
        );
      } catch (erro) {
        console.warn(
          "Não foi possível salvar o tema."
        );
      }
    }

    atualizarBotao(tema);
  }

  aplicarTema(obterTemaInicial(), false);

  document.addEventListener(
    "DOMContentLoaded",
    function () {
      atualizarBotao(obterTemaAtual());

      const botao =
        document.getElementById(
          "alternar-tema"
        );

      if (!botao) {
        return;
      }

      botao.addEventListener(
        "click",
        function () {
          const temaAtual =
            obterTemaAtual();

          const novoTema =
            temaAtual === "dark"
              ? "light"
              : "dark";

          aplicarTema(novoTema, true);
        }
      );
    }
  );

  const consultaTema = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

  function acompanharPreferenciaSistema() {
    let temaSalvo = null;

    try {
      temaSalvo =
        localStorage.getItem(CHAVE_TEMA);
    } catch (erro) {
      temaSalvo = null;
    }

    if (!temaSalvo) {
      aplicarTema(
        obterPreferenciaSistema(),
        false
      );
    }
  }

  if (consultaTema.addEventListener) {
    consultaTema.addEventListener(
      "change",
      acompanharPreferenciaSistema
    );
  } else if (consultaTema.addListener) {
    consultaTema.addListener(
      acompanharPreferenciaSistema
    );
  }
})();