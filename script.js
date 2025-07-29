const buttons = document.querySelectorAll('.add-btn');
const cartList = document.getElementById('cart-list');
const totalDisplay = document.getElementById('total');
const submitBtn = document.getElementById('submit-order');
const printBtn = document.getElementById('print-order');
const spinner = document.getElementById('loading-spinner');
const deliveryTime = document.getElementById('delivery-time');

let cart = [];

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.parentElement;
    const name = card.dataset.name;
    const price = Number(card.dataset.price);

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  });
});

function updateCart() {
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('cart-row');

    const nameSpan = document.createElement('span');
    nameSpan.textContent = item.name;

    const qtySpan = document.createElement('span');
    qtySpan.textContent = item.quantity;

    const priceSpan = document.createElement('span');
    priceSpan.textContent = `₦${item.quantity * item.price}`;

    li.appendChild(nameSpan);
    li.appendChild(qtySpan);
    li.appendChild(priceSpan);
    cartList.appendChild(li);

    total += item.quantity * item.price;
  });

  totalDisplay.textContent = total;
}


submitBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Please add something to your plate first!');
    return;
  }

  spinner.classList.remove('hidden');
  deliveryTime.textContent = '';
  setTimeout(() => {
    spinner.classList.add('hidden');
    alert('Order submitted successfully!');
    deliveryTime.textContent = 'Estimated delivery: 25–30 minutes';
  }, 2000);
});

printBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Nothing to print!');
    return;
  }

  const printable = cart.map(item => `${item.name} x${item.quantity} - ₦${item.quantity * item.price}`).join('\n');
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const printWindow = window.open('', '', 'width=600,height=400');
  printWindow.document.write(`<pre>${printable}\n\nTotal: ₦${total}</pre>`);
  printWindow.document.close();
  printWindow.print();
});
