const cartItems = {};
const productList = document.getElementById("productList");
const cartItemContainer = document.getElementById("cartItems");
const buyButtons = document.querySelectorAll(".buy-button");
const increaseButton = document.querySelectorAll(".increase-quantity");
const decreaseButton = document.querySelectorAll(".decrease-quantity");

const loadProducts = async () => {
  try {
    const response = await fetch("./products.json");

    if (!response.ok) {
      console.error("Fel från servern: " + response.status);
    }

    const products = await response.json();
    renderProducts(products);
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
      const oldPrice = document.createElement("p");
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
    article.appendChild(description);
    article.appendChild(detailsList);
    article.appendChild(priceContainer);

    if (product.badge) {
      const badge = document.createElement("span");
      badge.classList.add("badge");
      badge.textContent = product.badge;

      article.appendChild(badge);
    }

    productList.appendChild(article);
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

increaseButton.forEach((button) => {
  button.addEventListener("click", () => {
    const productCard = button.closest(".product-card");
    const quantityInput = productCard.querySelector(".quantity");

    quantityInput.value = Number(quantityInput.value) + 1;
  });
});

decreaseButton.forEach((button) => {
  button.addEventListener("click", () => {
    const productCard = button.closest(".product-card");
    const quantityInput = productCard.querySelector(".quantity");

    if (Number(quantityInput.value) > 1) {
      quantityInput.value = Number(quantityInput.value) - 1;
    }
  });
});

buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const productCard = button.closest(".product-card, .selected-product");
    const quantityAdd = productCard.querySelector(".quantity");
    let amount = 1;

    if (quantityAdd) {
      amount = Number(quantityAdd.value);
    }

    if (cartItems[name]) {
      cartItems[name] += amount;
    } else {
      cartItems[name] = amount;
    }

    updateCart();
    //alert(`${amount} st av varan ${name} lagd i varukorgen`);
  });
});

const showCartButton = document.getElementById("showCart");
const hideCartButton = document.getElementById("hideCart");
const cart = document.getElementById("cart");

showCartButton.addEventListener("click", () => {
  cart.classList.remove("cart-hidden");
});

hideCartButton.addEventListener("click", () => {
  cart.classList.add("cart-hidden");
});
