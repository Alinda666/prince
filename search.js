/* =========================================
   PRINCE ONLINE SHOP - SEARCH.JS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.querySelector(".search-box input");

    const searchButton =
        document.querySelector(".search-box button");

    const productGrid =
        document.querySelector(".product-grid");


    /* =====================================
       SEARCH FUNCTION
    ===================================== */

    function searchProducts() {

        if (!searchInput || !productGrid) {
            return;
        }

        const searchText =
            searchInput.value
                .toLowerCase()
                .trim();


        const products =
            productGrid.querySelectorAll(
                ".product-card"
            );


        let foundProducts = 0;


        products.forEach(function (product) {

            const nameElement =
                product.querySelector("h3");


            if (!nameElement) {
                return;
            }


            const productName =
                nameElement.textContent
                    .toLowerCase();


            if (
                searchText === "" ||
                productName.includes(searchText)
            ) {

                product.style.display = "";

                foundProducts++;

            } else {

                product.style.display = "none";

            }

        });


        /* =================================
           NO RESULTS MESSAGE
        ================================= */

        let noResults =
            document.getElementById(
                "no-results"
            );


        if (foundProducts === 0) {

            if (!noResults) {

                noResults =
                    document.createElement("div");

                noResults.id =
                    "no-results";

                noResults.innerHTML = `
                    <h2>No products found</h2>
                    <p>
                        Try searching for another product.
                    </p>
                `;

                noResults.style.textAlign =
                    "center";

                noResults.style.padding =
                    "40px";

                productGrid.appendChild(
                    noResults
                );
            }

        } else {

            if (noResults) {
                noResults.remove();
            }

        }

    }


    /* =====================================
       SEARCH WHILE TYPING
    ===================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            searchProducts
        );

    }


    /* =====================================
       SEARCH BUTTON
    ===================================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                searchProducts();

            }
        );

    }


    /* =====================================
       ENTER KEY
    ===================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchProducts();

                }

            }
        );

    }

});
