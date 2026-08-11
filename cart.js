document.addEventListener("DOMContentLoaded", function () {

    // Find all Add To Cart buttons
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            let name = button.getAttribute("data-name");
            let price = Number(button.getAttribute("data-price"));

            // Automatically get product information if data attributes are missing
            const card = button.closest(".product-card");

            if (card) {

                if (!name) {
                    const title = card.querySelector("h3, h2, h4");
                    if (title) {
                        name = title.textContent.trim();
                    }
                }

                if (!price) {
                    const newPrice = card.querySelector(".new");

                    if (newPrice) {
                        price = Number(
                            newPrice.textContent.replace(/[^0-9]/g, "")
                        );
                    }
                }
            }

            if (!name || !price) {
                alert("Product name or price is missing.");
                return;
            }

            // Get existing cart
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Find product
            const existingProduct = cart.find(function (item) {
                return item.name === name;
            });

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });
            }

            // Save cart
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(name + " added to cart!");

            console.log("CART SAVED:", cart);

        });

    });

});
<script src="cart.js"></script>
</body>
</html>
