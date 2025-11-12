document.addEventListener("DOMContentLoaded", function () {
  const lamp = document.querySelector(".lampada");
  if (!lamp) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    let intensity = scrollTop / docHeight;

    // Limita entre 0.1 e 1
    intensity = Math.max(0.1, Math.min(1, intensity));

    lamp.style.setProperty("--intensity", intensity);
  });
});
