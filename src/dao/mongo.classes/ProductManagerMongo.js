import productsModel from "../db/models/productsModel.js";

class ProductManagerMongo {
  async addProduct(product) {
    const productFound = await productsModel.findOne({ code: product.code });

    if (productFound) return "El producto ya existe";

    const newProduct = new productsModel(product);
    await newProduct.save();
    return "Producto nuevo guardado";
  }

  async updateProduct(id, product) {
    const productFound = await productsModel.findByIdAndUpdate(id, product, {
      new: true,
    });
    if (!productFound) return "El producto que desea actualizar no existe";

    return productFound;
  }

  async getProducts(limit) {
    if (limit) {
      const l = parseInt(limit);
      const productFound = await productsModel.find().limit(l);
      if (!productFound) return "no existe ningun producto";

      return productFound;
    }
    const productFound = await productsModel.find();
    if (!productFound) return "no existe ningun producto";

    return productFound;
  }

  async getProductsById(id) {
    const productFound = await productsModel.findById(id);
    if (!productFound) return "El producto buscado no existe";

    return productFound;
  }

  async deleteProduct(id) {
    const productFound = await productsModel.findByIdAndDelete(id);
    if (!productFound) return "El producto que desea eliminar no existe";

    return productFound;
  }
}

export default ProductManagerMongo;
