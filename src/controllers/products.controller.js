import Product from "../dao/mongo.classes/ProductsMongo.js";
import productManager from "../dao/mongo.classes/ProductManagerMongo.js";
import CustomError from "../services/errors/CustomError.js";
import { generateProductsErrorInfo } from "../services/errors/info.js";
import EErrors from "../services/errors/enums.js";
import jwt from 'jsonwebtoken';

const ProductManager = new productManager();

export const getProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const sort = parseInt(req.query.sort) || 0;
    const query = req.query.query;
    const page = parseInt(req.query.page) || 1;
    const disponible = req.params.disponible;

    let products = await ProductManager.getProducts(limit, sort, query, page, disponible);
    
    // const user = req.session.userData;
    // const cart = req.session.userData.cart || "";

    const cookie = req.cookies['coderCookie'];
    const user = jwt.verify(cookie, 'coderSecret');
    const cart = user.cart || "";

    products.payload.forEach(e => {
      e.cart = cart;
    });

    req.session.user = user;
    
    delete req.session.userData;
    
    res.status(200).send(products);
    // res.status(200).render("products.handlebars", {products, user});
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
    const {title, description, stock, thumbnails, category, price, status, code} = req.body;

    if (!title || !description || !code || !price || !status || !stock || !category) {
      CustomError.createError({
        name: "Product creation error",
        cause: generateProductsErrorInfo({title, description, code, price, status, stock, category}),
        message: "Error tratando de crear producto",
        code: EErrors.ERR_INVALID_TYPES
      })
    }

    let creatorProd = req.session.user;

    if (!creatorProd) {
      const cookie = req.cookies['coderCookie'];
      const user = jwt.verify(cookie, 'coderSecret');
      creatorProd = {rol: user.rol, email: user.email};
    }

    if (creatorProd.rol === 'usuario') {
      return res.send({Error: "No tiene permitido crear productos"});
    }
    
    if (creatorProd.rol == 'premium') {
      const newProduct = new Product(
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
        creatorProd.email
      );
  
      req.session.userData = creatorProd;
  
      await ProductManager.addProduct(newProduct);
      return res.status(200).redirect("/api/products");
    }

    const newProduct = new Product(
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
      creatorProd.rol
    );

    req.session.userData = creatorProd;

    const result = await ProductManager.addProduct(newProduct);
    
    res.status(200).send({status: "success", payload: result}) //Respuesta test
    // res.status(200).redirect("/api/products");
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
  // const userData = req.session.userData;
  const cookie = req.cookies['coderCookie'];
  const user = jwt.verify(cookie, 'coderSecret');
  
  if (user == undefined) {
    return res.redirect("/api/login");
  }
  return next();
}