import carsModel from "../db/models/carsModel.js";

class CarsManagerMongo {

  async createCar(car) {
    const newCar = new carsModel(car);
    await newCar.save();

    return "Nuevo carro creado";
  }

  async addToCar(idCar, product) {
    const existCart = await carsModel.findOne({ _id: idCar });
    if (!existCart) return "El carrito solicitado no existe";

    const existProduct = await carsModel.findOne({
      _id: idCar,
      "products.id": product.id,
    });

    if (existProduct) {
      await carsModel.findByIdAndUpdate(
        idCar,
        { $inc: { "products.$[elem].quantity": product.quantity } },
        { new: true, arrayFilters: [{ "elem.id": product.id }] }
      );
      return `Se actualizó la cantidad en el producto con ID: ${product.id}`;
    } else {
      await carsModel.findByIdAndUpdate(idCar, {
        $push: {
          products: { $each: [{ id: product.id, quantity: product.quantity }] },
        },
      });
      return `El producto ID: ${product.id} / Fue agregado con quantity: ${product.quantity}`;
    }
  }

  async showProducts(idCar) {
    
    const getCar = await carsModel.findOne({_id: idCar});
    if(!getCar) return "el carrito solicitado no existe";

    return getCar;
  }
}

export default CarsManagerMongo;
