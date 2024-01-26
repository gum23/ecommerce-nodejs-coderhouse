const socket = io();

socket.on("products", (allProducts) => {
  console.log(allProducts);
  updateProductList(allProducts);
});

function updateProductList(productList) {
  const producDiv = document.getElementById("list-products");

  let productsHTML = "";

  productList.forEach((product) => {
    productsHTML += `
    
        <div class="card bg-secondarymb-3 mx-4my-4" style="max-width: 20rem; margin: 12px;">
            <div class="card-header bg-primary text-white">code: ${product.code}</div>
            <div class="card-body">
                <h4 class="card-title text-white">${product.title}</h4>
                <p class="card-text">
                    <ul class="card-text">
                        <li>id: ${product.id}</li>
                        <li>description: ${product.description}</li>
                        <li>price: ${product.price}</li>
                        <li>category: ${product.category}</li>
                        <li>status: ${product.status}</li>
                        <li>stock: ${product.stock}</li>
                        thumbnails: <img src="${product.thumbnails}" alt="${product.title}" class="img-fluid image"/>
                    </ul>
                </p>
            </div>
            <div class="d-flex justify-content-center mb-4">
                <button type="button" class="btn btn-danger delete-btn" onClick="deleteProduct('${product.id}')">Eliminar</button>
            </div>
        </div>
    
    `;
  });

  producDiv.innerHTML = productsHTML;
}

let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const dataForm = new FormData(evt.target);
  const newProduct = Object.fromEntries(dataForm);

  socket.emit("addProduct", newProduct);

  evt.target.reset();
});

function deleteProduct(productId) {
  console.log(productId);
  socket.emit("deleteProduct", productId);
}
