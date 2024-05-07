export const generateProductsErrorInfo = (products) => {
    return `Una o más propiedades estan incompletas o invalidas.
    Lista de propiedades requeridas:
        -> Title: Necesita un String, recibió ${products.title}
        -> Description: Necesita un String, recibió ${products.description}
        -> Code: Necesita String and unique ${products.code}
        -> Price: Necesita un Number, recibió ${products.price}
        -> Stock: Necesita un Number, recibió ${products.stock}
        -> Category: Necesita un String, recibió ${products.category}
    `;
}

export const generateCartErrorInfo = (quantity) => {
    return `Esta propiedad no puede estar vacia o su valor no debe de ser null
        -> Quantity: No puede ser null ni String vacio, se recibió '${quantity.quantity}'
    `;
}