import Product from "../classes/Products.js";
import ProductManager from "../classes/ProductManager.js";

const productManager = new ProductManager();

export const getProducts = async (req, res) => {};

export const getProduct = async (req, res) => {};

export const createProduct = async (req, res) => {
  await productManager.initialize();
  const prod = req.body;
  try {
    const product = new Product(
      prod.title,
      prod.description,
      prod.code,
      prod.price,
      prod.status,
      prod.stock,
      prod.category,
      prod.thumbnails
    );
    
    const result = await productManager.addProduct(product);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(`Error de servidor: ${error}`);
  }
};

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};
