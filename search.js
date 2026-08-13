document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const productGrid = document.querySelector(".product-grid");

    if (!searchInput || !searchButton || !productGrid) {
        console.log("Search elements not found.");
        return;
    }

    function searchProducts() {

        const searchText =
            searchInput.value.toLowerCase().trim();

        const products =
            productGrid.querySelectorAll(".product-card");

        let found = 0;

        products.forEach(function (product) {

            const name =
                product.querySelector("h3");

            if (!name) return;

            const productName =
                name.textContent.toLowerCase();

            if (
                searchText === "" ||
                productName.includes(searchText)
            ) {

                product.style.display = "";

                found++;

            } else {

                product.style.display = "none";

            }

        });

        let message =
            document.getElementById("no-search-results");

        if (found === 0) {

            if (!message) {

                message =
                    document.createElement("p");

                message.id =
                    "no-search-results";

                message.textContent =
                    "No products found.";

                message.style.textAlign =
                    "center";

                message.style.padding =
                    "30px";

                productGrid.appendChild(message);
            }

        } else {

            if (message) {
                message.remove();
            }

        }

    }


    /* Search button */

    searchButton.addEventListener(
        "click",
        searchProducts
    );


    /* Search while typing */

    searchInput.addEventListener(
        "input",
        searchProducts
    );


    /* Search when pressing Enter */

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchProducts();

            }

        }
    );

});
