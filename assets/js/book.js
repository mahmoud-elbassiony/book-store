var bookRequest = new XMLHttpRequest();
var bookObj;
let isItemInCart = false;
let cartItems;
if (localStorage.localCart) {
  cartItems = JSON.parse(localStorage.localCart);
} else {
  cartItems = [];
}

bookRequest.open(
  "GET",
  `https://www.googleapis.com/books/v1/volumes/${window.location.search
    .split("=")
    .pop()}`
);
bookRequest.send();

bookRequest.addEventListener("load", function () {
  if (this.status == 200) {
    bookObj = JSON.parse(this.responseText);
    bookPage();
  } else {
    alert("Something went wrong please try again");
  }
});
bookRequest.onerror = function () {
  alert("SSomething went wrong please try again");
};

function bookPage() {
  document.querySelector(".book-item img").src =
    bookObj.volumeInfo.imageLinks?.thumbnail || "./imgs/book.jpg";
  document.querySelector(".book-title").textContent =
    bookObj.volumeInfo.title ?? "";
  document.querySelector(".book-item .authors").textContent =
    "By " + bookObj.volumeInfo.authors?.join(", ") || "Unknown";
  document.querySelector(".Publisher span").innerHTML =
    bookObj.volumeInfo.publisher ?? "Unknown";
  document.querySelector(".Published-date span").innerHTML =
    bookObj.volumeInfo.publishedDate ?? "Unknown";
  document.querySelector(".description p").innerHTML =
    bookObj.volumeInfo.description ?? "No Description Available.";
}

// import updateCartCount from "./cartModue";
var cartCount = document.querySelector(".cart-count");
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

function cartFun() {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id == bookObj.id) {
      isItemInCart = true;
      cartItems[i].count++;
    }
  }
  if (isItemInCart == false) {
    cartItems.push({
      id: bookObj.id,
      bookTitle: bookObj.volumeInfo.title,
      bookImage: bookObj.volumeInfo.imageLinks.thumbnail,
      count: 1,
    });
  }

  localStorage.localCart = JSON.stringify(cartItems);
  cartItems = JSON.parse(localStorage.localCart);

  document.querySelector(".cart-btn").style.backgroundColor = "#45a8f0";
  document.querySelector(".cart-btn").innerHTML = "Added to cart";
  updateCartCount();
}

document.querySelector(".cart-btn").addEventListener("click", cartFun);
