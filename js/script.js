let searchInput = document.querySelector("input[type=search]");
let searchBtn = document.querySelector(".search button");
let booksContainer = document.querySelector(".books .books-container");
let cartCount = document.querySelector(".cart-count");
let booksArr = [];
let cartItems;
if (localStorage.localCart) {
  cartItems = JSON.parse(localStorage.localCart);
} else {
  cartItems = [];
}
let isItemInCart = false;
let isSearch = false;

let header = document.querySelector("header");
let sticky = header.offsetTop;
onscroll = function () {
  if (window.scrollY > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

let booksRequest = new XMLHttpRequest();
booksRequest.open(
  "GET",
  "https://www.googleapis.com/books/v1/volumes?q=software+development"
);
booksRequest.send();

function requestBooksFun() {
  booksRequest.addEventListener("load", function () {
    if (this.status == 200) {
      booksArr = JSON.parse(this.responseText).items;

      if (booksArr) {
        if (isSearch == false) {
          document.querySelector(".heading").style.display = "block";
        }
        createBooks();
      } else {
        document.querySelector(".no-results").style.display = "block";
      }
    } else {
      document.querySelector(".no-results").style.display = "block";
    }
    document.querySelector(".pre-load").style.display = "none";
  });
  booksRequest.onprogress = function () {
    document.querySelector(".error").style.display = "none";
    document.querySelector(".heading").style.display = "none";
    document.querySelector(".no-results").style.display = "none";
    document.querySelector(".pre-load").style.display = "block";
  };
  booksRequest.onerror = function () {
    document.querySelector(".pre-load").style.display = "none";
    document.querySelector(".heading").style.display = "none";
    document.querySelector(".no-results").style.display = "none";
    document.querySelector(".error").style.display = "block";
  };
}
requestBooksFun();

function searchFun() {
  document.querySelector(".heading").style.display = "none";
  isSearch = true;
  window.scroll({
    left: 0,
    top: window.innerHeight - 79,
    behavior: "smooth",
  });
  booksContainer.innerHTML = "";
  document.querySelector(".pre-load").style.display = "block";
  booksRequest.open(
    "GET",
    `https://www.googleapis.com/books/v1/volumes?q=${searchInput.value.trim()}`
  );
  booksRequest.send();
  requestBooksFun();
}

function createBooks() {
  booksContainer.innerHTML = "";
  for (let i = 0; i < booksArr.length; i++) {
    let book = document.createElement("div");
    let imageContainer = document.createElement("div");
    let bookInfo = document.createElement("div");
    let bookImg = document.createElement("img");
    let bookTitle = document.createElement("h4");
    let bookAuthors = document.createElement("h5");
    let actions = document.createElement("div");
    let detailsBtn = document.createElement("button");
    let cartBtn = document.createElement("button");

    bookImg.src =
      booksArr[i].volumeInfo.imageLinks?.thumbnail ?? "./imgs/book.jpg";
    bookImg.alt = "Book img";
    bookTitle.textContent = booksArr[i].volumeInfo.title ?? "Unknown";
    bookAuthors.textContent = booksArr[i].volumeInfo.authors?.join(", ") || "";

    detailsBtn.innerHTML = `<a href="./book.html?=${booksArr[i].id}">View Details</a>`;
    cartBtn.innerHTML = `<a href="javascript:void(0)" onclick=cartFun(${i})>Add to cart</a>`;

    imageContainer.classList.add("img-container");
    book.classList.add("book-container");
    bookInfo.classList.add("book-info");
    detailsBtn.classList.add("details-btn");
    cartBtn.classList.add("cart-btn");

    booksContainer.appendChild(book);
    book.appendChild(imageContainer).appendChild(bookImg);
    book.appendChild(bookInfo).appendChild(bookTitle);
    bookInfo.appendChild(bookAuthors);
    book.appendChild(actions).appendChild(cartBtn);
    actions.appendChild(detailsBtn);
  }
}

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

function cartFun(i) {
  let clickedBook = {
    id: booksArr[i].id,
    bookTitle: booksArr[i].volumeInfo.title,
    bookImage: booksArr[i].volumeInfo.imageLinks.thumbnail,
    count: 1,
  };

  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id == clickedBook.id) {
      cartItems[i].count++;
      isItemInCart = true;
    }
  }
  if (isItemInCart == false) {
    cartItems.push(clickedBook);
  }
  localStorage.setItem("localCart", JSON.stringify(cartItems));
  cartItems = JSON.parse(localStorage.localCart);

  document.querySelectorAll(".cart-btn")[i].style.backgroundColor = "#45a8f0";
  document.querySelectorAll(".cart-btn")[i].innerHTML = "Added to cart";
  updateCartCount();
}

searchBtn.addEventListener("click", searchFun);
