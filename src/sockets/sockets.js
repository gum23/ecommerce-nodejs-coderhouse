import Product from "../dao/mongo.classes/ProductsMongo.js";
import ProductManager from "../dao/mongo.classes/ProductManagerMongo.js";
import ChatMongo from "../dao/mongo.classes/ChatMongo.js";
import ChatManagerMongo from '../dao/mongo.classes/chatManagerMongo.js';

const productManager = new ProductManager();
const chatManagerMongo = new ChatManagerMongo();

export const sockets = (socketServer) => {
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
    });

    const chatList = await chatManagerMongo.getMessages();
    socketServer.sockets.emit("messages", chatList);

    socket.on("addMessage", async (newMessage) => {
      const message = new ChatMongo(newMessage.user, newMessage.message);
      
      await chatManagerMongo.createMessage(message);

      const chatList = await chatManagerMongo.getMessages();
      socketServer.sockets.emit("messages", chatList);
    });

    socket.on("idDelete", async (idDelete) => {
      const resDelete = await chatManagerMongo.deleteMessage(idDelete);

      const chatList = await chatManagerMongo.getMessages();
      socketServer.sockets.emit("messages", chatList);

      socket.emit("resDelete", resDelete);
    })

  });
}