import * as methods from "../dao/FileSystem/utils/methods.carsManager.js";

class CarsManager {
  constructor() {
    this.cars = [];
  }

  async initialize() {
    await methods.ensureExistFile();
    this.cars = await methods.readFile();
  }

  async createCar(car) {
    const idCar = this.cars.find(c => c.id == car.id);
    
    try {
      if(idCar){
        return `El carrito con id ${idCar.id} ya existe`;
      }
      this.cars.push(car);
      await methods.writeFile(this.cars);
      
      return `El carrito id: ${car.id}\n Se agregó correctamente`;
    } catch (error) {
      return `Error al crear un nuevo carrito ${error}`;
    }
  }

  async addToCar(idCar, product) {
    const existCart = this.cars.find(c => c.id == idCar);
    
    console.log(existCart);
    try {
      if (existCart) {
        const existProduct = existCart.products.find(p => p.id == product.id);
        
        if (existProduct) {
          existProduct.quantity += product.quantity;

          await methods.writeFile(this.cars);
          return `Se actualizó la cantidad del producto: ${product.id}`;
        } else {
          
          console.log(typeof(this.cars))
          existCart.products.push(product);
          await methods.writeFile(this.cars);
  
          return `${product.id}\n Es un producto nuevo`;
        }

      }

    } catch (error) {
      return `Error al guardar o actualizar un producto: ${error}`;
    }
    
  }

  async showProducts(idCar){
    const existCart = this.cars.find(c => c.id == idCar);

    try {
      if (existCart) {
        const products = existCart.products;

        return {
          massage:`Los productos del car ID:  ${idCar}`, 
          products
        };
      } else {
        return `El id: ${idCar} \nNo pertenece a ningun carrito`;
      }
    } catch (error) {
      return `Hubo un error en la busqueda del carrito: ${error}`;
    }

  }

}

export default CarsManager;
