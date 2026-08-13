/* =========================================
   PRINCE ONLINE SHOP - PRODUCTS.JS
========================================= */

const products = [

    {
        id: 1,
        name: "Nike Air Max",
        image: "shoe1.jpg",
        oldPrice: 70000,
        price: 60000,
        discount: "-50%",
        category: "Shoes"
    },

    {
        id: 2,
        name: "iPhone 16",
        image: "phone.jpg",
        oldPrice: 12000,
        price: 7800,
        discount: "-35%",
        category: "Phones"
    },

    {
        id: 3,
        name: "Gaming Laptop",
        image: "laptop.jpg",
        oldPrice: 1400000,
        price: 840000,
        discount: "-40%",
        category: "Computers"
    },

    {
        id: 4,
        name: "Luxury Watch",
        image: "watch.jpg",
        oldPrice: 250000,
        price: 99000,
        discount: "-60%",
        category: "Watches"
    },

    {
        id: 5,
        name: "Motorcycle",
        image: "motocyle.jpg",
        oldPrice: 2000000,
        price: 1500000,
        discount: "-40%",
        category: "Motorcycles"
    },

    {
        id: 6,
        name: "Ceramic Tiles",
        image: "kitchen ceramic tiles.jpg",
        oldPrice: 45000,
        price: 42000,
        discount: "-7%",
        category: "Home"
    },

    {
        id: 7,
        name: "Samsung Galaxy S25",
        image: "samsung.jpg",
        oldPrice: 1500000,
        price: 1200000,
        discount: "-20%",
        category: "Phones"
    },

    {
        id: 8,
        name: "HP Gaming Laptop",
        image: "hp-laptop.jpg",
        oldPrice: 4000000,
        price: 3000000,
        discount: "-25%",
        category: "Computers"
    },

    {
        id: 9,
        name: "Smart Watch",
        image: "smartwatch.jpg",
        oldPrice: 250000,
        price: 150000,
        discount: "-40%",
        category: "Watches"
    },

    {
        id: 10,
        name: "Bluetooth Headphones",
        image: "headphones.jpg",
        oldPrice: 200000,
        price: 130000,
        discount: "-35%",
        category: "Electronics"
    },

    {
        id: 11,
        name: "Air Jordan Shoes",
        image: "air-jordan.jpg",
        oldPrice: 300000,
        price: 210000,
        discount: "-30%",
        category: "Shoes"
    }

];


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function displayProducts(productList = products) {

    const productGrid =
        document.querySelector(".product-grid");

    if (!productGrid) {
        return;
    }

    productGrid.innerHTML = "";

    productList.forEach(function (product) {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <span class="discount">
                ${product.discount}
            </span>

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <h3>
                ${product.name}
            </h3>

            <div class="price">

                <span class="old">
                    UGX ${product.oldPrice.toLocaleString()}
                </span>

                <span class="new">
                    UGX ${product.price.toLocaleString()}
                </span>

            </div>

            <button
                class="add-to-cart"
                data-name="${product.name}"
                data-price="${product.price}">

                Add To Cart

            </button>

        `;

        productGrid.appendChild(card);

    });

}


/* =========================================
   SEARCH PRODUCTS
========================================= */

function searchProducts(searchText) {

    const text =
        searchText.toLowerCase().trim();

    const results =
        products.filter(function (product) {

            return (
                product.name
                    .toLowerCase()
                    .includes(text)
                ||
                product.category
                    .toLowerCase()
                    .includes(text)
            );

        });

    displayProducts(results);

}


/* =========================================
   START PRODUCTS
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayProducts();

        const searchInput =
            document.querySelector(
                ".search-box input"
            );

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                function () {

                    searchProducts(
                        searchInput.value
                    );

                }
            );

        }

    }
);
