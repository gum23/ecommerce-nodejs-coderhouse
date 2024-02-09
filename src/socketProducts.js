import Product from "./dao/mongo.classes/ProductsMongo.js";
import ProductManager from "./dao/mongo.classes/ProductManagerMongo.js";

const productManager = new ProductManager();

export const socketProducts = (socketServer) => {
  socketServer.on("connection", async (socket) => {

    const productList = await productManager.getProducts();
    
    socketServer.emit("products", productList);

    socket.on("addProduct", async (newProduct) => {

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

      await productManager.deleteProduct(productId);

      const productList = await productManager.getProducts();
      socketServer.emit("products", productList);
    })

  })
}