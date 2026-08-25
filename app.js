const cartItems = {};
const cartItemContainer = document.getElementById("cartItems");
const buyButtons = document.querySelectorAll(".buy-button");
const increaseButton = document.querySelectorAll(".increase-quantity");
const decreaseButton = document.querySelectorAll(".decrease-quantity");

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
