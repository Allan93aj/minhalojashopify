document.addEventListener("DOMContentLoaded", async () => {
  const productsContainer = document.getElementById("products-container");

  // 1️⃣ Busca produtos reais da Shopify via Storefront API
  async function fetchProducts() {
    const response = await fetch('/products.json?limit=12'); // ou coleção específica
    const data = await response.json();
    return data.products;
  }

  // 2️⃣ Renderiza os cards
  function renderProducts(products, step) {
    productsContainer.innerHTML = "";
    products.forEach((product) => {
      const div = document.createElement("div");
      div.classList.add("product-card");
      div.innerHTML = `
        <img src="${product.images[0]?.src}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class="price">${Shopify.formatMoney(product.variants[0].price)}</p>
        <button data-id="${product.variants[0].id}" class="add-btn">Selecionar</button>
      `;
      productsContainer.appendChild(div);
    });

    document.querySelectorAll(".add-btn").forEach(btn => {
      btn.addEventListener("click", (e) => selectProduct(e.target.dataset.id, step));
    });
  }

  // 3️⃣ Seleciona o produto e ativa o próximo passo
  function selectProduct(variantId, step) {
    const selectEl = document.getElementById(`step${step}-select`);
    selectEl.innerHTML = `<option selected value="${variantId}">Produto selecionado</option>`;

    if (step < 3) {
      const next = document.getElementById(`step${step + 1}-select`);
      next.disabled = false;
      next.classList.remove("build-your-kit-builder__select--disabled");
    } else {
      document.getElementById("resumo-btn").disabled = false;
      document.getElementById("resumo-btn").classList.remove("build-your-kit-builder__actions-button--disabled");
    }
  }

  // 4️⃣ Inicializa com os produtos do passo 1
  const products = await fetchProducts();
  renderProducts(products, 1);
});
