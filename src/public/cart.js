
const cartId = window.location.pathname.split('/').pop();

const deleteProduct = async (idProduct) => {
    
    const endPoint = `/api/carts/${cartId}/product/${idProduct}`;
    
    try {
        await fetch(endPoint, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })

        location.reload();
    } catch (error) {
        console.log(error);
    }

}

const cartEmpty = async () => {
    
    const endPoint = `/api/carts/${cartId}`;

    try {
        await fetch(endPoint, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })

        location.reload();
    } catch (error) {
        console.log(error);
    }
}

const purchase = () => {
    return window.location.href = `/api/${cartId}/purchase`;
}