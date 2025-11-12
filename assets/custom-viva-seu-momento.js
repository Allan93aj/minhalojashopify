document.addEventListener("DOMContentLoaded", () => {
  const scenes = document.querySelectorAll(".viva-momento-scene");

  function visibleRatio(element) {
    const rect = element.getBoundingClientRect();
    const height = window.innerHeight;
    const visible = Math.max(0, Math.min(rect.bottom, height) - Math.max(rect.top, 0));
    return Math.max(0, Math.min(1, visible / height));
  }

  function updateIntensity() {
    scenes.forEach(scene => {
      const lamp = scene.querySelector(".lampada");
      const luz = scene.querySelector(".luz-efeito");
      const ratio = visibleRatio(scene);
      const power = 1.4;
      const intensity = Math.pow(ratio, power);

      lamp.style.setProperty("--intensity", intensity.toFixed(3));
      luz.style.setProperty("--intensity", intensity.toFixed(3));
    });
    ticking = false;
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateIntensity);
      ticking = true;
    }
  });

  updateIntensity();
});
