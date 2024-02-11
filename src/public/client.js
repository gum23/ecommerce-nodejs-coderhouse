const socket = io();

socket.on("products", (allProducts) => {
  updateProductList(allProducts);
});

function updateProductList(productList) {
  const producDiv = document.getElementById("list-products");

  let productsHTML = "";

  productList.forEach((product) => {
    productsHTML += `
    
        <div class="card mb-3 mx-4my-4" style="max-width: 20rem; margin: 12px;">
            <div class="card-header bg-primary text-white">code: ${product.code}</div>
            <div class="card-body">
                <h4 class="card-title text-black">${product.title}</h4>
                <p class="card-text">
                    <ul class="card-text list-unstyled">
                        <li class="bi bi-file-text"> description: ${product.description}</li>
                        <li class="bi bi-currency-dollar"> price: ${product.price}</li>
                        <li class="bi bi-grid"> category: ${product.category}</li>
                        <li class="bi bi-check-circle"> status: ${product.status}</li>
                        <li class="bi bi-box"> stock: ${product.stock}</li>
                        <i class="bi bi-image"></i> thumbnails:
                        <div class="imageContent"> 
                          <img src="${product.thumbnails}" alt="${product.title}" class="img-fluid image"/>
                        </div>
                    </ul>
                </p>
            </div>
            <div class="d-flex justify-content-center mb-4">
                <button type="button" class="btn btn-danger delete-btn" onClick="deleteProduct('${product._id}')">Eliminar</button>
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
  socket.emit("deleteProduct", productId);
}
