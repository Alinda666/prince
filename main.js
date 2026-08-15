// ==========================================
// PRINCE ONLINE SHOP - MAIN.JS
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // UPDATE CART COUNT
    // ==========================================

    function updateCartCount() {

        const cartCount = document.getElementById("cart-count");

        if (!cartCount) return;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let totalQuantity = 0;

        cart.forEach(function (item) {
            totalQuantity += Number(item.quantity) || 0;
        });

        cartCount.textContent = totalQuantity;
    }


    // Run when page loads
    updateCartCount();


    // ==========================================
    // UPDATE CART COUNT WHEN STORAGE CHANGES
    // ==========================================

    window.addEventListener("storage", function () {
        updateCartCount();
    });


    // ==========================================
    // SEARCH BUTTON
    // ==========================================

    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    function performSearch() {

        if (!searchInput) return;

        const searchText =
            searchInput.value.trim().toLowerCase();

        if (searchText === "") {
            alert("Please enter a product name.");
            return;
        }

        // Find product cards
        const products =
            document.querySelectorAll(".product-card");

        let found = false;

        products.forEach(function (product) {

            const productName =
                product.querySelector("h3");

            if (!productName) return;

            const name =
                productName.textContent.toLowerCase();

            if (name.includes(searchText)) {

                product.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                product.style.outline =
                    "3px solid #ff6600";

                setTimeout(function () {

                    product.style.outline = "";

                }, 2500);

                found = true;
            }

        });

        if (!found) {

            alert(
                'No product found for "' +
                searchText +
                '"'
            );

        }
    }


    // Search button
    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    // Search using Enter key
    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    performSearch();
                }

            }
        );

    }


    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (
                targetId &&
                targetId !== "#"
            ) {

                const target =
                    document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }

        });

    });


    // ==========================================
    // SHOP NOW BUTTON
    // ==========================================

    const shopButtons =
        document.querySelectorAll(".btn");

    shopButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            const products =
                document.querySelector(".products");

            if (products) {

                event.preventDefault();

                products.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    // ==========================================
    // CART COUNT UPDATE AFTER CLICKING
    // ==========================================

    document.addEventListener(
        "click",
        function (event) {

            if (
                event.target.classList.contains(
                    "add-to-cart"
                )
            ) {

                // Give cart.js time to save the product
                setTimeout(function () {
                    updateCartCount();
                }, 100);

            }

        }
    );


    // ==========================================
    // WELCOME MESSAGE
    // ==========================================

    console.log(
        "PRINCE ONLINE SHOP loaded successfully."
    );

});
