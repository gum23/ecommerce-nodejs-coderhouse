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

const toCart = () => {
    return window.location.href = `/api/mail`;
}
