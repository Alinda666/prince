document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const productCards = document.querySelectorAll(".product-card");

    if (!searchInput || !searchButton) {
        console.error("Search input or search button not found.");
        return;
    }

    function searchProducts() {

        const searchText = searchInput.value
            .trim()
            .toLowerCase();

        let found = 0;

        productCards.forEach(function (product) {

            const productName =
                product.querySelector("h3")?.textContent
                .toLowerCase() || "";

            const productCategory =
                product.dataset.category?.toLowerCase() || "";

            if (
                searchText === "" ||
                productName.includes(searchText) ||
                productCategory.includes(searchText)
            ) {

                product.style.display = "";

                found++;

            } else {

                product.style.display = "none";

            }

        });

        // Remove old message
        const oldMessage =
            document.getElementById("search-message");

        if (oldMessage) {
            oldMessage.remove();
        }

        // Show message if nothing found
        if (found === 0 && searchText !== "") {

            const productsSection =
                document.querySelector(".products");

            if (productsSection) {

                const message =
                    document.createElement("div");

                message.id = "search-message";

                message.textContent =
                    `No products found for "${searchText}"`;

                message.style.textAlign = "center";
                message.style.padding = "40px";
                message.style.fontSize = "22px";
                message.style.fontWeight = "600";

                productsSection.prepend(message);
            }
        }

        // Scroll to products
        const productsSection =
            document.querySelector(".products");

        if (productsSection && searchText !== "") {

            productsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }

    // Search button
    searchButton.addEventListener(
        "click",
        searchProducts
    );

    // Press Enter to search
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
