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

  async getProducts(limit, sort, query, page) {

    const orderPrice = sort === -1 ? 'desc' : 'asc';
    const querySearch = query ? {category: query} : {};

    const op = {
      page: page,
      limit: limit,
      sort: {price: orderPrice}
    }
    const productFound = await productsModel.paginate({...querySearch}, op);
    if (!productFound) return "no existe ningun producto";

    if(productFound.hasPrevPage = true) productFound.prevLink = `http://localhost:8080/api/products?page=${productFound.prevPage}`;
    if(productFound.hasNextPage = true) productFound.nextLink = `http://localhost:8080/api/products?page=${productFound.nextPage}`;
    
    const responseProducts = {
      payload: productFound.docs,
      totalPages: productFound.totalPages,
      prevPage: productFound.prevPage,
      nextPage: productFound.nextPage,
      page: productFound.page,
      hasPrevPage: productFound.hasPrevPage,
      hasNextPage: productFound.hasNextPage,
      prevLink: productFound.prevLink || null,
      nextLink: productFound.nextLink || null
    }

    return responseProducts;
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
