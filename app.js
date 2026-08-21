const buyButtons = document.querySelectorAll(".buy-button");

buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    alert(`Varan ${name} lagd i varukorgen`);
  });
});
