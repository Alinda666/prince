document.addEventListener("DOMContentLoaded", function () {

    const categoryCards = document.querySelectorAll(".category-card");
    const productCards = document.querySelectorAll(".product-card");

    categoryCards.forEach(function (category) {

        category.addEventListener("click", function () {

            const categoryName = category.textContent
                .trim()
                .toLowerCase()
                .replace(/[^\w\s]/gi, "")
                .trim();

            let foundProducts = 0;

            productCards.forEach(function (product) {

                const productCategory =
                    product.dataset.category?.toLowerCase();

                if (productCategory === categoryName) {

                    product.style.display = "block";
                    foundProducts++;

                } else {

                    product.style.display = "none";

                }

            });

            // Scroll to products
            const productsSection =
                document.querySelector(".products");

            if (productsSection) {
                productsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            // No products message
            let message =
                document.getElementById("no-products-message");

            if (!message) {

                message = document.createElement("div");

                message.id = "no-products-message";

                message.style.textAlign = "center";
                message.style.padding = "40px";
                message.style.fontSize = "22px";
                message.style.fontWeight = "600";
                message.style.color = "#555";

                productsSection.appendChild(message);
            }

            if (foundProducts === 0) {

                message.textContent =
                    `No products found in "${categoryName}".`;

                message.style.display = "block";

            } else {

                message.style.display = "none";

            }

        });

    });

});
