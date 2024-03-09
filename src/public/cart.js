
const deleteProduct = async (idProduct) => {
    const endPoint = `/api/carts/65db7e6be4645424b0f0289a/product/${idProduct}`;
    
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
    const endPoint = `/api/carts/65db7e6be4645424b0f0289a`;

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