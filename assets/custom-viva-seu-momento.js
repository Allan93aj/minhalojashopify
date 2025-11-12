document.addEventListener("DOMContentLoaded", () => {
  const lampLight = document.querySelector(".lamp-light");
  const section = document.querySelector("#viva-seu-momento");

  function visibleRatio(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const visibleTop = Math.max(0, 0 - rect.top);
    const visibleBottom = Math.max(0, rect.bottom - windowHeight);
    const visibleHeight = rect.height - visibleTop - visibleBottom;
    return Math.max(0, Math.min(1, visibleHeight / rect.height));
  }

  let ticking = false;

  function updateIntensity() {
    ticking = false;
    const ratio = visibleRatio(section);
    const power = 1.5; // curva de intensidade
    const intensity = Math.pow(ratio, power);
    lampLight.style.setProperty("--intensity", intensity.toFixed(3));
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateIntensity);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll);
  updateIntensity();
});