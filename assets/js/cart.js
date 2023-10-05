let cartItems;
if (localStorage.localCart) {
  cartItems = JSON.parse(localStorage.localCart);
} else {
  cartItems = [];
}

let cartCount = document.querySelector(".cart-count");
function updateCartCount() {
  let cartCounter = null;
  for (let i = 0; i < cartItems.length; i++) {
    cartCounter += +cartItems[i].count;
  }
  cartCount.textContent = cartCounter;
  if (cartCounter == null) {
    cartCount.style.display = "none";
  } else {
    cartCount.style.display = "flex";
  }
  localStorage.localCart = JSON.stringify(cartItems);
}
updateCartCount();

function createCartItems() {
  if (cartItems.length > 0) {
    document.querySelector(".cart-items .container").innerHTML = "";
    for (let i = 0; i < cartItems.length; i++) {
      document.querySelector(".cart-items .container").innerHTML += ` 
      <div class="cart-item">
        <div class="img-container">
          <img
            src= "${cartItems[i].bookImage}"
            alt=""
          />
        </div>
        <div class="item-details">
          <h4 class="item-title">${cartItems[i].bookTitle}</h4>
          <div class="actions">
            <button class="increase-btn" onclick=increaseCount(${i})>+</button>
            <span class="item-count">${cartItems[i].count}</span>
            <button class="decrease-btn" onclick=decreaseCount(${i})>-</button>
          </div>
          <button class="remove-btn" onclick="removeItem(${i})">Remove</button>
        </div>
      </div>
    </div>
  `;
      if (cartItems[i].count == 1) {
        document
          .querySelectorAll(".decrease-btn")
          [i].setAttribute("disabled", true);
      } else {
        document
          .querySelectorAll(".decrease-btn")
          [i].removeAttribute("disabled");
      }
    }
  } else {
    document.querySelector(
      ".cart-items .container"
    ).innerHTML = ` <div class="empty-cart">
    <p>Your cart is empty!</p>
    <button><a href="./index.html">Start Shopping</a></button>
  </div>
    `;
  }
}
createCartItems();

function increaseCount(i) {
  cartItems[i].count++;
  localStorage.setItem("localCart", JSON.stringify(cartItems));

  createCartItems();
  updateCartCount();
}

function decreaseCount(i) {
  cartItems[i].count--;
  localStorage.setItem("localCart", JSON.stringify(cartItems));

  createCartItems();
  updateCartCount();
}

function removeItem(i) {
  cartItems.splice(i, 1);
  localStorage.setItem("localCart", JSON.stringify(cartItems));

  createCartItems();
  updateCartCount();
}
