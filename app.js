const buyButtons = document.querySelectorAll(".buy-button");

buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const productCard = button.closest(".product-card");
    const quantityAdd = productCard.querySelector(".quantity");
    const amount = quantityAdd.value;

    alert(`${amount} st av varan ${name} lagd i varukorgen`);
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
