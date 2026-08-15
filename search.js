// ==========================================
// PRINCE ONLINE SHOP - SEARCH.JS
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("search-input");

    const searchButton =
        document.getElementById("search-button");

    // Get all product cards on the current page
    const productCards =
        document.querySelectorAll(".product-card");


    // ==========================================
    // SEARCH FUNCTION
    // ==========================================

    function searchProducts() {

        if (!searchInput) {
            return;
        }

        const searchText =
            searchInput.value.trim().toLowerCase();


        // If search box is empty
        if (searchText === "") {

            productCards.forEach(function (product) {
                product.style.display = "";
            });

            return;
        }


        let foundProducts = 0;


        productCards.forEach(function (product) {

            // Find product name
            const title =
                product.querySelector("h3");

            // Find product description if available
            const description =
                product.querySelector("p");

            const productName =
                title
                    ? title.textContent.toLowerCase()
                    : "";

            const productDescription =
                description
                    ? description.textContent.toLowerCase()
                    : "";


            // Check product name or description
            if (
                productName.includes(searchText) ||
                productDescription.includes(searchText)
            ) {

                product.style.display = "";

                foundProducts++;

            } else {

                product.style.display = "none";

            }

        });


        // ==========================================
        // NO RESULTS MESSAGE
        // ==========================================

        let noResults =
            document.getElementById("no-search-results");


        if (foundProducts === 0) {

            if (!noResults) {

                noResults =
                    document.createElement("div");

                noResults.id =
                    "no-search-results";

                noResults.innerHTML = `
                    <div style="
                        text-align:center;
                        padding:50px 20px;
                        background:white;
                        border-radius:12px;
                        margin-top:20px;
                    ">

                        <h2>No products found</h2>

                        <p>
                            We couldn't find a product
                            matching "<strong>
                            ${searchInput.value}
                            </strong>".
                        </p>

                        <button
                            id="clear-search"
                            style="
                                margin-top:15px;
                                padding:12px 22px;
                                border:none;
                                border-radius:8px;
                                background:#ff6600;
                                color:white;
                                cursor:pointer;
                                font-weight:bold;
                            "
                        >
                            Clear Search
                        </button>

                    </div>
                `;


                // Put message after products
                const productsSection =
                    document.querySelector(".products");


                if (productsSection) {

                    productsSection.appendChild(
                        noResults
                    );

                } else {

                    document.body.appendChild(
                        noResults
                    );

                }


                // Clear button
                const clearButton =
                    document.getElementById(
                        "clear-search"
                    );


                if (clearButton) {

                    clearButton.addEventListener(
                        "click",
                        clearSearch
                    );

                }

            }

        } else {

            if (noResults) {
                noResults.remove();
            }

        }

    }


    // ==========================================
    // CLEAR SEARCH
    // ==========================================

    function clearSearch() {

        if (searchInput) {
            searchInput.value = "";
        }


        productCards.forEach(function (product) {

            product.style.display = "";

        });


        const noResults =
            document.getElementById(
                "no-search-results"
            );


        if (noResults) {
            noResults.remove();
        }

    }


    // ==========================================
    // SEARCH BUTTON
    // ==========================================

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            searchProducts
        );

    }


    // ==========================================
    // PRESS ENTER TO SEARCH
    // ==========================================

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


    // ==========================================
    // LIVE SEARCH
    // ==========================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                // Only search while typing
                // when at least 2 characters
                if (
                    searchInput.value.trim().length >= 2
                ) {

                    searchProducts();

                }

                // Restore products when cleared
                if (
                    searchInput.value.trim() === ""
                ) {

                    clearSearch();

                }

            }
        );

    }

});
