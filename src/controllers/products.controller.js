import Product from "../dao/mongo.classes/ProductsMongo.js";
import productManager from "../dao/mongo.classes/ProductManagerMongo.js";

const ProductManager = new productManager();

export const getProducts = async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await ProductManager.getProducts(limit);

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(`Error de servidor: ${error}`);
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await ProductManager.getProductsById(id);

    res.status(200).send(product);
  } catch (error) {
    res.status(200).send(`Error de servidor: ${error}`);
  }
};

export const createProduct = async (req, res) => {
  try {
    const dataBody = req.body;

    const newProduct = new Product(
      dataBody.title,
      dataBody.description,
      dataBody.code,
      dataBody.price,
      dataBody.status,
      dataBody.stock,
      dataBody.category,
      dataBody.thumbnails
    );

    const resClass = await ProductManager.addProduct(newProduct);
    res.status(200).send(resClass);
  } catch (error) {
    res.status(500).send(`Error de servidor: ${error}`);
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.pid;
  const updateData = req.body;
  const resUpdate = await ProductManager.updateProduct(id, updateData);

  res.status(200).send({
    message: "Producto actualizado correctamente",
    data: resUpdate
  })

};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.pid;
  const resDelete = await ProductManager.deleteProduct(id);

  res.status(200).send({ 
    message: "El producto eliminado", 
    data: resDelete 
  });

  } catch (error) {
    res.status(500).send(`Error de servidor: ${error}`);  
  }
};
