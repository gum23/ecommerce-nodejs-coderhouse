import Product from "../classes/Products.js";
import ProductManager from "../classes/ProductManager.js";

const productManager = new ProductManager();

export const getProducts = async (req, res) => {

    await productManager.initialize();
  
    try {
      // const limit = req.query.limit;
      // const limitNum = parseInt(limit);
  
      const products = await productManager.getProducts();

      // const io = req.app.get("io");
      // io.emit("products", result);

      res.status(200).render("home.handlebars", {products});

    } catch (error) {
      return error;
    }
  
  };

export const getRealTimeProd = async (req, res) => {
  await productManager.initialize();

  res.render("realTimeProducts");
};