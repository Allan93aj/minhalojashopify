document.addEventListener("scroll", () => {
  const postes = document.querySelectorAll(".icone-poste");
  postes.forEach((poste) => {
    const rect = poste.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calcula o quanto o poste está visível na tela (0 a 1)
    const visible = Math.max(
      0,
      Math.min(1, (windowHeight - rect.top) / windowHeight)
    );

    // Intensidade com base na visibilidade
    const maxBrightness = poste.style.getPropertyValue("--max-brightness") || 150;
    const brightness = 1 + (visible * (maxBrightness / 100 - 1));

    poste.querySelector("img").style.filter = `brightness(${brightness}) drop-shadow(0 0 ${visible * 30}px rgba(255, 210, 0, ${visible}))`;
  });
});
