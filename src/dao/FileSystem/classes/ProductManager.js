import * as methods from "../dao/FileSystem/utils/methods.productManager.js";

class ProductManager {
  constructor() {
    this.products = [];
  }

  async initialize() {
    await methods.ensureExistFile();
    this.products = await methods.readFile();
  }

  async addProduct(product) {
    
    if (
      !product.title ||
      !product.description ||
      !product.code ||
      !product.price ||
      !product.status ||
      !product.stock ||
      !product.category
    ) {
      return "Todos los campos son obligatorios";
    }

    try {
      const prodById = this.products.find((p) => p.code == product.code);

      if (prodById) {
        await methods.writeFile(this.products);
        return `El producto ${prodById.title} ya existe`;
      } else {
        this.products.push(product);
        await methods.writeFile(this.products);
        return `El producto ${product.title} de la categoria ${product.category} fue agregado exitosamente`;
      }
    } catch (error) {
      if (error.code === "ENOENT") {
        await methods.writeFile([product]);
        return {
          messageOne: `No existía el archivo ${methods.PATH}`,
          messageTwo: `Archivo ${methods.PATH} fue creado y se agregó el producto ${product.title}`,
        };
      } else {
        return "Error", error;
      }
    }
  }

  async updateProduct(id, product) {
    const i = this.products.findIndex((p) => p.id === id);
    if (i !== -1) {
      await methods.updateProduct(i, product, this.products);
      await methods.writeFile(this.products);

      return `El producto ${this.products[i].title} se actualizó correctamente`;
    } else {
      return "Product Not Found";
    }
  }

  async getProducts(limit) {
    if (limit) {
      const newArr = this.products.slice(0, limit);
      return newArr;
    } else {
      return this.products;
    }
  }

  async getProductsById(id) {
    let product = this.products.find((product) => product.id === id);

    if (product == undefined) {
      return { "Error en el pedido": "El producto no existe" };
    } else {
      return product;
    }
  }

  async deleteProduct(id) {
    const i = this.products.findIndex((prod) => prod.id === id);

    if (i !== -1) {
      this.products.splice(i, 1);
      
      await methods.writeFile(this.products);
      return `El producto de id: ${id}\n Fue eliminado correctamente!!`;
    } else {
      return `El id: ${id} ingresado no coincide con ningun producto`;
    }
  }
}

export default ProductManager;
