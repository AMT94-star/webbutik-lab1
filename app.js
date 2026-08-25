const cartItems = {};
const cartItemContainer = document.getElementById("cartItems");
const buyButtons = document.querySelectorAll(".buy-button");

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

buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const productCard = button.closest(".product-card");
    const quantityAdd = productCard.querySelector(".quantity");
    const amount = Number(quantityAdd.value);

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
