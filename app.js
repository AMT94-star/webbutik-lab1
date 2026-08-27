const cartItems = {};
const productList = document.getElementById("productList");
const featuredProducts = document.getElementById("featuredProducts");
const cartItemContainer = document.getElementById("cartItems");

const loadProducts = async () => {
  try {
    const response = await fetch("./products.json");

    if (!response.ok) {
      throw new Error("Fel från servern: " + response.status);
    }

    const products = await response.json();
    renderProducts(products);

    const featured = products.filter((product) => product.featured);
    renderFeaturedProducts(featured);
  } catch (error) {
    console.error("Fel: ", error);
  }
};

const renderProducts = (products) => {
  products.forEach((product) => {
    console.log("Produkt: ", product);

    const article = document.createElement("article");
    article.classList.add("product-card");

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.imageAlt;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const productInteraction = document.createElement("div");
    productInteraction.classList.add("product-interaction");

    const decreaseButton = document.createElement("button");
    decreaseButton.classList.add("decrease-quantity");
    decreaseButton.textContent = "-";
    decreaseButton.type = "button";
    decreaseButton.addEventListener("click", () => {
      if (Number(quantityInput.value) > 1) {
        quantityInput.value = Number(quantityInput.value) - 1;
      }
    });

    const quantityInput = document.createElement("input");
    quantityInput.classList.add("quantity");
    quantityInput.type = "number";
    quantityInput.value = 1;
    quantityInput.min = 1;

    const increaseButton = document.createElement("button");
    increaseButton.classList.add("increase-quantity");
    increaseButton.textContent = "+";
    increaseButton.type = "button";
    increaseButton.addEventListener("click", () => {
      quantityInput.value = Number(quantityInput.value) + 1;
    });

    const buyButton = document.createElement("button");
    buyButton.classList.add("buy-button");
    buyButton.textContent = "🛒";
    buyButton.type = "button";
    buyButton.dataset.name = product.name;
    buyButton.addEventListener("click", () => {
      const amount = Number(quantityInput.value);
      const name = product.name;

      if (cartItems[name]) {
        cartItems[name] += amount;
      } else {
        cartItems[name] = amount;
      }

      updateCart();
    });

    productInteraction.appendChild(decreaseButton);
    productInteraction.appendChild(quantityInput);
    productInteraction.appendChild(increaseButton);
    productInteraction.appendChild(buyButton);

    const description = document.createElement("p");
    description.textContent = product.description;

    const detailsList = document.createElement("ul");
    product.details.forEach((detail) => {
      const listInfo = document.createElement("li");
      listInfo.textContent = detail;
      detailsList.appendChild(listInfo);
    });

    const priceContainer = document.createElement("p");
    priceContainer.classList.add("price-container");
    priceContainer.textContent = "Pris: ";
    if (product.oldPrice) {
      const oldPrice = document.createElement("span");
      oldPrice.classList.add("old-price");
      oldPrice.textContent = `${product.oldPrice} kr`;

      priceContainer.appendChild(oldPrice);
    }

    const price = document.createElement("span");
    price.textContent = `${product.price} kr`;

    if (product.oldPrice) {
      price.classList.add("new-price");
    }
    priceContainer.appendChild(price);

    article.appendChild(image);
    article.appendChild(title);
    article.appendChild(priceContainer);
    article.appendChild(productInteraction);
    article.appendChild(description);
    article.appendChild(detailsList);

    if (product.badge) {
      const badge = document.createElement("span");
      badge.classList.add("badge");
      badge.textContent = product.badge;

      article.appendChild(badge);
    }

    productList.appendChild(article);
  });
};

const renderFeaturedProducts = (featured) => {
  featured.forEach((product) => {
    const article = document.createElement("article");
    article.classList.add("selected-product");

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.imageAlt;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const priceContainer = document.createElement("span");
    priceContainer.classList.add("price-container");
    priceContainer.textContent = "Pris: ";

    if (product.oldPrice) {
      const oldPrice = document.createElement("span");
      oldPrice.classList.add("old-price");
      oldPrice.textContent = `${product.oldPrice} kr`;

      priceContainer.appendChild(oldPrice);
    }

    const price = document.createElement("span");
    price.textContent = `${product.price} kr`;

    if (product.oldPrice) {
      price.classList.add("new-price");
    }
    priceContainer.appendChild(price);

    const buyButton = document.createElement("button");
    buyButton.classList.add("buy-button");
    buyButton.textContent = "Lägg i varukorg";
    buyButton.type = "button";
    buyButton.dataset.name = product.name;

    buyButton.addEventListener("click", () => {
      const name = product.name;

      if (cartItems[name]) {
        cartItems[name] += 1;
      } else {
        cartItems[name] = 1;
      }

      updateCart();
    });

    article.appendChild(image);
    article.appendChild(title);
    article.appendChild(priceContainer);
    article.appendChild(buyButton);

    if (product.badge) {
      const badge = document.createElement("span");
      badge.classList.add("badge");
      badge.textContent = product.badge;

      article.appendChild(badge);
    }

    featuredProducts.appendChild(article);
  });
};

loadProducts();

const updateCart = () => {
  cartItemContainer.innerHTML = "";

  //hämtar alla nycklar dvs produkter från objekten/cart
  if (Object.keys(cartItems).length == 0) {
    cartItemContainer.textContent = "Varukorgen är tom";
    return;
  }

  for (const name in cartItems) {
    const amount = cartItems[name];

    //skapar en ny p-tagg
    const item = document.createElement("p");
    item.textContent = `${name}: ${amount} st`;

    cartItemContainer.appendChild(item);
  }
};

updateCart();

const showCartButton = document.getElementById("showCart");
const hideCartButton = document.getElementById("hideCart");
const cart = document.getElementById("cart");

showCartButton.addEventListener("click", () => {
  cart.classList.remove("cart-hidden");
});

hideCartButton.addEventListener("click", () => {
  cart.classList.add("cart-hidden");
});
