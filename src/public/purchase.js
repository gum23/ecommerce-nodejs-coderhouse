let total = 0;
const totalElement = document.getElementById("total");

document.addEventListener('DOMContentLoaded', () => {
    const subTotalElement = document.querySelectorAll('#subTotal');

    subTotalElement.forEach((quantityElement) => {
        const subTotal = parseInt(quantityElement.textContent);

        total += subTotal;
    })
    totalElement.innerText = `$  ${total}`;
});

const path = window.location.pathname.split('/');
const cartId = path.slice(2, 3).pop();


const payment = async (purchaseData) => {
    const endPoint = "/api/payment-intents";

    const code = {
        code: purchaseData
    }
    
    const response = await fetch(endPoint, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(code)
    });

    const data = await response.json();
    return window.location.href = `${data.payload.url}`;
}
