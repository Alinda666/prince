document.addEventListener("DOMContentLoaded", function () {

    const categoryButtons =
        document.querySelectorAll(".category-card");

    const products =
        document.querySelectorAll(".product-card");


    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory =
                button.getAttribute("data-category");


            // Remove active from all buttons
            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });


            // Add active to clicked button
            button.classList.add("active");


            // Show or hide products
            products.forEach(function (product) {

                const productCategory =
                    product.getAttribute("data-category");


                if (
                    selectedCategory === "all" ||
                    productCategory === selectedCategory
                ) {

                    product.style.display = "";

                } else {

                    product.style.display = "none";

                }

            });

        });

    });

});
