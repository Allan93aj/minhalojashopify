document.addEventListener("DOMContentLoaded", () => {
  const collections = window.kitBuilderCollections || [];
  const selects = [
    document.getElementById("step1-select"),
    document.getElementById("step2-select"),
    document.getElementById("step3-select"),
  ];

  const productsContainer = document.getElementById("products-container");
  const nextButton = document.getElementById("next-button");
  const backButton = document.getElementById("back-button");
  const finishButton = document.getElementById("finish-button");
  const summarySection = document.getElementById("summary-section");
  const summaryContent = document.getElementById("summary-content");
  const summaryTotal = document.getElementById("summary-total");
  const addToCartButton = document.getElementById("add-to-cart");

  let currentStep = 0;
  const selectedProducts = [null, null, null];

  async function fetchProducts(handle) {
    const response = await fetch(`/collections/${handle}/products.json`);
    const data = await response.json();
    return data.products;
  }

  function formatPrice(price) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price / 100);
  }

  function renderProducts(products) {
    productsContainer.innerHTML = "";
    products.forEach((product) => {
      const variant = product.variants[0];
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <img src="${product.images[0]?.src}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${formatPrice(variant.price)}</p>
      `;
      card.addEventListener("click", () => selectProduct(product, card));
      productsContainer.appendChild(card);
    });
  }

  function selectProduct(product, card) {
    selectedProducts[currentStep] = product;
    document.querySelectorAll(".product-card").forEach(c => {
      c.classList.add("disabled");
      c.classList.remove("selected");
    });
    card.classList.remove("disabled");
    card.classList.add("selected");
    nextButton.disabled = false;
  }

  async function loadStep(step) {
    productsContainer.innerHTML = "<p>Carregando produtos...</p>";
    nextButton.disabled = true;

    const collection = collections[step];
    if (!collection) {
      productsContainer.innerHTML = "<p>Nenhuma coleção configurada.</p>";
      return;
    }

    const handle = collection.handle;
    const products = await fetchProducts(handle);
    renderProducts(products);
  }

  function showSummary() {
    productsContainer.style.display = "none";
    document.querySelector(".steps-container").style.display = "none";
    document.getElementById("button-container").style.display = "none";
    summarySection.style.display = "block";

    let total = 0;
    summaryContent.innerHTML = "";
    selectedProducts.forEach((p) => {
      const variant = p.variants[0];
      total += parseFloat(variant.price);
      summaryContent.innerHTML += `
        <div class="summary-item">
          <p>${p.title} - ${formatPrice(variant.price)}</p>
        </div>
      `;
    });
    summaryTotal.textContent = formatPrice(total);
  }

  async function addToCart() {
    for (let p of selectedProducts) {
      if (!p) continue;
      const variant = p.variants[0];
      await fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: variant.id, quantity: 1 }),
      });
    }
    window.location.href = "/cart";
  }

  nextButton.addEventListener("click", async () => {
    currentStep++;
    if (currentStep < 3) {
      await loadStep(currentStep);
      backButton.disabled = false;
      if (currentStep === 2) {
        nextButton.style.display = "none";
        finishButton.style.display = "inline-block";
      }
    }
  });

  backButton.addEventListener("click", async () => {
    if (currentStep > 0) {
      currentStep--;
      await loadStep(currentStep);
      if (currentStep === 0) backButton.disabled = true;
      finishButton.style.display = "none";
      nextButton.style.display = "inline-block";
    }
  });

  finishButton.addEventListener("click", showSummary);
  addToCartButton.addEventListener("click", addToCart);

  // Carrega primeiro passo
  loadStep(0);
});
