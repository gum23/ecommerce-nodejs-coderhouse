import cartsModel from "../db/models/cartsModel.js";

class CarsManagerMongo {

  async createCar(date, car) {
    const newCar = new cartsModel({date: date}, car);
    await newCar.save();
    return newCar;
  }

  async addToCar(idCart, product, quantity) {
    const existCart = await cartsModel.findOne({ _id: idCart });
    if (!existCart) return "El carrito solicitado no existe";

    
    const existProduct = await cartsModel.findOne({
      _id: idCart,
      "products.product": product._id
    });

    if (existProduct) {
      await cartsModel.updateOne(
        {_id: idCart, "products.product": product._id},
        { $inc: { "products.$.quantity": quantity } }
      );
      return `Se actualizó la cantidad en el producto con ID: ${product.id}`;
    } else {
      const result = await cartsModel.findByIdAndUpdate(idCart, {
        $push: {
          products: { $each: [{ product: product, quantity: quantity }] },
        },
      });
      return result;
    }
  }

  async newQuantity(quantity, idCart, product) {
    const cart = await cartsModel.findOne({_id: idCart});
    
    const existProduct = await cartsModel.findOne({
      _id: idCart,
      "products.product": product._id
    });
    
    if (existProduct) {
      await cartsModel.updateOne(
        {_id: idCart, "products.product": product._id},
        { $inc: { "products.$.quantity": quantity } }
      );
      return `Se actualizó la cantidad en el producto con ID: ${product.id}`;
    } else {
      
      return `El producto ID: ${product.id} / No existe en su carrito`;
    }
  }

  async showProducts(idCar) {
    
    const getCar = await cartsModel.findOne({_id: idCar});
    if(!getCar) return "el carrito solicitado no existe";

    return getCar;
  }

  async deleteOneProduct(idCart, idProduct){

    await cartsModel.updateOne({_id: idCart},
      {$pull: {"products": {"product": idProduct}}})

    return "Se eliminó correctamente";
  }

  async deleteAllProducts(idCart){

    await cartsModel.updateOne(
      {_id: idCart},
      {$set: {products: []}}
    )

    return "Se eliminaron todos los productos";

  }

}

export default CarsManagerMongo;
