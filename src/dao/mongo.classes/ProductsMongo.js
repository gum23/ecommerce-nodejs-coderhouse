
export default class ProductMongo {
    
    constructor(title, description, code, price, status, stock, category, thumbnails, owner){
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = true;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
        this.owner = owner;
    }
}

