import uuid4 from 'uuid4';

export default class Cars {

    constructor(products) {
        this.id = Cars.idGenerator();
        this.products = products
    }

    static idGenerator() {
        const ID = uuid4();
        return ID;
    }
}