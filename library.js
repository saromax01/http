const cartList = document.getElementById("cart-list");

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  cartList.innerHTML = "";
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.forEach((book, index) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";
    listItem.textContent = `${book.title} - ${book.price}€`;

    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-danger btn-sm";
    removeButton.textContent = "Rimuovi";
    removeButton.onclick = function () {
      removeFromCart(index);
    };
    listItem.appendChild(removeButton);

    cartList.appendChild(listItem);
  });
}

function addToCart(book) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function fetchBooks() {
  fetch(" https://striveschool-api.herokuapp.com/books")
    .then((response) => response.json())
    .then((books) => {
      const booksRow = document.getElementById("books-row");
      books.forEach((book) => {
        const col = document.createElement("div");
        col.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
        col.innerHTML = `
              <div class="card h-100">
                <img src="${book.img}" class="card-img-top" alt="Cover of ${book.title}">
                <div class="card-body">
                  <h5 class="card-title">${book.title}</h5>
                  <p class="card-text">${book.price}€</p>
                  <button class="btn btn-danger discard-btn">Scarta</button>
                  <button class="btn btn-success buy-btn">Compra ora</button>
                </div>
              </div>
            `;
        booksRow.appendChild(col);

        col.querySelector(".discard-btn").addEventListener("click", () => {
          col.remove();
        });

        col.querySelector(".buy-btn").addEventListener("click", () => {
          addToCart(book);
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching the books:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  fetchBooks();
});
