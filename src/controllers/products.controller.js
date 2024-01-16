import Product from "../classes/Products.js";
import ProductManager from "../classes/ProductManager.js";

const productManager = new ProductManager();

export const getProducts = async (req, res) => {
  await productManager.initialize();

  try {
    const limit = req.query.limit;
    const limitNum = parseInt(limit);

    const result = await productManager.getProducts(limitNum);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(`Error de servidor ${error}`);
  }

};

export const getProduct = async (req, res) => {
  await productManager.initialize();

  try {
    const id = req.params.pid;
    const result = await productManager.getProductsById(id);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(`Error de servidor ${error}`);
  }
};

export const createProduct = async (req, res) => {
  await productManager.initialize();
  const prod = req.body;
  try {
    const product = new Product(
      prod.title,
      prod.description,
      prod.code,
      prod.price,
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

export const updateProduct = async (req, res) => {
  await productManager.initialize();
  
  try {
    const id = req.params.pid;
    const product = req.body;
    const result = await productManager.updateProduct(id, product);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(`Error de servidor ${error}`);
  }
};

export const deleteProduct = async (req, res) => {
  await productManager.initialize();

  try {
    const id = req.params.pid;
    const result = await productManager.deleteProduct(id);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(`Error de servidor ${error}`);
  }
};
