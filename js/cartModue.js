// function cartFun(i, arr) {
//   sessionStorage.setItem(
//     `book${arr[i].id}`,
//     JSON.stringify({
//       bookTitle: arr[i].volumeInfo.title,
//       bookImage: arr[i].volumeInfo.imageLinks.thumbnail,
//     })
//   );
//   document.querySelectorAll(".cart-btn")[i].style.backgroundColor =
//     "rgb(54, 151, 67)";
//   document.querySelectorAll(".cart-btn")[i].innerHTML = "Added to cart";
// }

function updateCartCount(cartCount) {
  let cartCounter = null;
  for (let i = 0; i < Object.values(localStorage).length; i++) {
    cartCounter += +JSON.parse(Object.values(localStorage)[i]).count;
  }
  cartCount.textContent = cartCounter;
  if (cartCounter == null) {
    cartCount.style.display = "none";
  } else {
    cartCount.style.display = "flex";
  }
}

export default updateCartCount;
