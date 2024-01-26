import Product from "./classes/Products.js";
import ProductManager from "./classes/ProductManager.js";

const productManager = new ProductManager();

export const socketProducts = (socketServer) => {
  socketServer.on("connection", async (socket) => {
    await productManager.initialize();

    const productList = await productManager.getProducts();
    
    socketServer.emit("products", productList);

    socket.on("addProduct", async (newProduct) => {
      await productManager.initialize();

      const product = new Product(
        newProduct.title,
        newProduct.description,
        newProduct.code,
        newProduct.price,
        newProduct.stock,
        newProduct.category,
        newProduct.thumbnails
      );
      
      await productManager.addProduct(product);

      const productList = await productManager.getProducts();
      socketServer.emit("products", productList);
    });

    socket.on("deleteProduct", async (productId) => {
      await productManager.initialize();

      await productManager.deleteProduct(productId);

      const productList = await productManager.getProducts();
      socketServer.emit("products", productList);
    })

  })
}