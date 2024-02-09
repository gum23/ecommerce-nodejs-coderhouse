import uuid4 from 'uuid4';

export default class Product {
    
    constructor(title, description, code, price, stock, category, thumbnails){
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = true;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
        this.id = Product.idGenerator()
    }

    static idGenerator() {
        const ID = uuid4();
        return ID;
    }
}

