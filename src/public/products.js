const urlSearchParams = new URLSearchParams(window.location.search);
const currentLimit = urlSearchParams.get('limit');
const currentSort = urlSearchParams.get('sort');
const currentQuery = urlSearchParams.get('query');
const currentPage = urlSearchParams.get('page');
const currentDisponible = urlSearchParams.get('disponible');

const limit3 = document.getElementById("option3");
const limit5 = document.getElementById("option5");
const sortAsc = document.getElementById("asc");
const sortDesc = document.getElementById("desc");
const queryCuerdas = document.getElementById("cuerdas");
const queryTeclas = document.getElementById("teclas");
const queryAccesorios = document.getElementById("accesorios");
const queryVientos = document.getElementById("vientos");
const queryPercusion = document.getElementById("percusion");
const queryDisponible = document.getElementById("stock");
const prevPage = document.getElementById("prev");
const nextPage = document.getElementById("next");


const handleLimit = (limitValue) => {
    urlSearchParams.set("limit", limitValue)
    window.location.href = `${location.pathname}?${urlSearchParams}`;

    if (currentLimit == limitValue) {
        urlSearchParams.delete("limit");
        window.location.href = `${location.pathname}?${urlSearchParams}`;
    }
}

limit3.addEventListener("click", () => {
    handleLimit(limit3.value);
});

limit5.addEventListener("click", () => {
    handleLimit(limit5.value)
});

const handleSort = (sortValue) => {
    urlSearchParams.set("sort", sortValue);
    window.location.href = `${location.pathname}?${urlSearchParams}`;

    if (currentSort == sortValue) {
        urlSearchParams.delete("sort");
        window.location.href = `${location.pathname}?${urlSearchParams}`;
    }
}

sortAsc.addEventListener("click", () => {
    handleSort(sortAsc.value);
});

sortDesc.addEventListener("click", () => {
    handleSort(sortDesc.value);
});

const handleFilter = (queryValue) => {
    urlSearchParams.set("query", queryValue);
    window.location.href = `${location.pathname}?${urlSearchParams}`;

    if (currentQuery == queryValue) {
        urlSearchParams.delete("query");
        window.location.href = `${location.pathname}?${urlSearchParams}`;
    }
}

queryCuerdas.addEventListener("click", () => {
    handleFilter(queryCuerdas.value);
});

queryTeclas.addEventListener("click", () => {
    handleFilter(queryTeclas.value);
});

queryAccesorios.addEventListener("click", () => {
    handleFilter(queryAccesorios.value);
});

queryVientos.addEventListener("click", () => {
    handleFilter(queryVientos.value);
});

queryPercusion.addEventListener("click", () => {
    handleFilter(queryPercusion.value);
});

const handleDispo = (stockValue) => {
    urlSearchParams.set("disponible", stockValue);
    window.location.href = `${location.pathname}?${urlSearchParams}`;

    if (currentDisponible == stockValue) {
        urlSearchParams.delete("disponible");
        window.location.href = `${location.pathname}?${urlSearchParams}`;
    }
}

queryDisponible.addEventListener("click", () => {
    handleDispo(queryDisponible.value);
})

const handlePages = (pageValue) => {
    if (pageValue == "") {
        urlSearchParams.set("page", currentPage);
        window.location.href = `${location.pathname}?${urlSearchParams}`;
        return
    }
    urlSearchParams.set("page", pageValue);
    window.location.href = `${location.pathname}?${urlSearchParams}`;
}

prevPage.addEventListener("click", () => {
    handlePages(prevPage.value);
});

nextPage.addEventListener("click", () => {
    handlePages(nextPage.value);
});

const deleteProduct = async (idProduct) => {
    const endPoint = `/api/products/${idProduct}`;
    
    try {
        await fetch(endPoint, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        });

        sendMail();

        location.reload();
    } catch (error) {
        console.log(error);
    }

}

const sendMail = async () => {
    const endPoint = "/api/deleteProduct";

    try {
        await fetch(endPoint, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        });

    } catch (error) {
        console.log(error);
    }
}