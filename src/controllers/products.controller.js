import Product from "../dao/mongo.classes/ProductsMongo.js";
import productManager from "../dao/mongo.classes/ProductManagerMongo.js";
import CustomError from "../services/errors/CustomError.js";
import { generateProductsErrorInfo } from "../services/errors/info.js";
import EErrors from "../services/errors/enums.js";

const ProductManager = new productManager();

export const getProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const sort = parseInt(req.query.sort) || 0;
    const query = req.query.query;
    const page = parseInt(req.query.page) || 1;
    const disponible = req.params.disponible;

    let products = await ProductManager.getProducts(limit, sort, query, page, disponible);
    
    const user = req.session.userData;
    const cart = req.session.userData.cart;
    
    products.payload.forEach(e => {
      e.cart = cart;
    });

    req.session.user = user;
    
    delete req.session.userData;

    res.status(200).render("products.handlebars", {products, user});
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
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;

    if (!title || !description || !code || !price || !status || !stock || !category) {
      CustomError.createError({
        name: "Product creation error",
        cause: generateProductsErrorInfo({title, description, code, price, status, stock, category}),
        message: "Error tratando de crear producto",
        code: EErrors.INVALID_TYPES_ERROR
      })
    }

    const newProduct = new Product(
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    );

    const resClass = await ProductManager.addProduct(newProduct);
    res.status(200).send(resClass);
  } catch (error) {
    console.error(error.cause);
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

export function auth(req, res, next) {
  const user = req.session.userData;
  
  if (user == undefined) {
    return res.redirect("/api/login");
  }
  return next();
}