document.addEventListener("DOMContentLoaded", function () {
  const lamp = document.querySelector(".lampada");
  if (!lamp) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    let intensity = scrollTop / docHeight;

    // Mantém dentro de 0.05 e 1
    intensity = Math.max(0.05, Math.min(1, intensity));

    lamp.style.setProperty("--intensity", intensity);

    if (intensity > 0.2) {
      lamp.classList.add("pulsar");
    } else {
      lamp.classList.remove("pulsar");
    }
  });
});
