

document.addEventListener("DOMContentLoaded", () => {
  const lamp = document.getElementById("lamp");
  const street = document.getElementById("street");

  // Função que calcula a porcentagem visível do elemento na tela (0 a 1)
  function visibleRatio(el) {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const visibleTop = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
    return Math.max(0, Math.min(1, visibleTop / rect.height));
  }

  // Controle do "tick" de scroll
  let ticking = false;

  function updateLampIntensity() {
    ticking = false;

    const ratio = visibleRatio(street);
    // curva suave: começa apagada e acende mais forte no final
    const power = 1.4;
    const intensity = Math.pow(ratio, power);

    // aplica no CSS
    lamp.style.setProperty("--intensity", intensity.toFixed(3));
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateLampIntensity);
      ticking = true;
    }
  }

  // Eventos
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  // Inicializa
  updateLampIntensity();
});
