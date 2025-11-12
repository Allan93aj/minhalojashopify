(function () {
  // Debounce simples para performance no scroll
  function debounce(fn, wait) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, arguments), wait);
    };
  }

  function updatePostLight() {
    const postes = document.querySelectorAll(".icone-poste");
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    postes.forEach((poste) => {
      const img = poste.querySelector("img");
      if (!img) return;

      const rect = poste.getBoundingClientRect();
      // porcentagem de visibilidade do topo: quando top <= windowHeight e bottom >= 0
      const visibleTop = Math.max(0, Math.min(windowHeight, windowHeight - rect.top));
      const visibleRatio = Math.max(0, Math.min(1, visibleTop / windowHeight));

      // Ler intensidade máxima definida em schema (valor percentual)
      // O Liquid define --max-brightness em atributo inline (ex: 150)
      const maxBrightnessPercent = parseFloat(getComputedStyle(poste).getPropertyValue("--max-brightness")) || 150;
      // converte para multiplicador: ex 150% => 1.5
      const maxMultiplier = maxBrightnessPercent / 100;

      // Brightness base 1 -> até maxMultiplier
      const brightness = 1 + (visibleRatio * (maxMultiplier - 1));

      // drop-shadow com tom amarelo, intensidade vinculada à visibilidade
      const glowPx = Math.round(visibleRatio * 30); // até 30px de blur
      const glowOpacity = (visibleRatio * 0.9).toFixed(2); // opacidade do glow (até 0.9)

      img.style.filter = `brightness(${brightness})`;
      img.style.boxShadow = `0 0 ${glowPx}px rgba(255, 200, 50, ${glowOpacity})`;
      // para performance: hint de propriedade
      img.style.willChange = "filter, box-shadow";
    });
  }

  // Executa no carregamento (para estado inicial) e no scroll/resize
  document.addEventListener("DOMContentLoaded", updatePostLight);
  window.addEventListener("resize", debounce(updatePostLight, 120));
  window.addEventListener("scroll", debounce(updatePostLight, 12));
})();
