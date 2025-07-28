const foodItems = [
  {
    name: "Jollof Rice",
    price: 1500,
    description: "Spicy rice with tomato sauce and meat.",
    image: "images/jollof.jpg"
  },
  {
    name: "Egusi Soup",
    price: 2000,
    description: "Melon seed soup with assorted meat.",
    image: "images/egusi.jpg"
  },
  {
    name: "Akpu & Ogbono",
    price: 1800,
    description: "Akpu served with Ogbono soup.",
    image: "images/akpu.jpg"
  },
  {
    name: "Suya",
    price: 1200,
    description: "Spicy grilled meat with onions and pepper.",
    image: "images/suya.jpg"
  }
];

let cart = [];

function displayMenu() {
  const menu = document.getElementById("menu");
  foodItems.forEach((food, index) => {
    const card = document.createElement("div");
    card.className = "food-card";
    card.innerHTML = `
      <img src="${food.image}" alt="${food.name}" />
      <h3>${food.name}</h3>
      <p>${food.description}</p>
      <p>₦${food.price}</p>
      <button onclick="addToCart(${index})">Add to Plate</button>
    `;
    menu.appendChild(card);
  });
}

function addToCart(index) {
  cart.push(foodItems[index]);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const total = document.getElementById("total");
  cartList.innerHTML = "";

  let sum = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name + " - ₦" + item.price;
    cartList.appendChild(li);
    sum += item.price;
  });

  total.textContent = sum;
}

document.getElementById("submit-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Please select at least one item.");
    return;
  }

  alert("Order submitted! Thank you for your patronage. 😊");
});

document.getElementById("print-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Nothing to print. Please add items to your plate.");
    return;
  }

  let printWindow = window.open("", "", "width=600,height=400");
  printWindow.document.write("<h2>Your Order</h2><ul>");

  cart.forEach(item => {
    printWindow.document.write(`<li>${item.name} - ₦${item.price}</li>`);
  });

  let total = cart.reduce((sum, item) => sum + item.price, 0);
  printWindow.document.write(`</ul><p><strong>Total:</strong> ₦${total}</p>`);
  printWindow.document.close();
  printWindow.print();
});

displayMenu();
