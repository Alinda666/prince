// ==========================================
// PRINCE ONLINE SHOP - ADD TO CART
// ==========================================

let cart = JSON.parse(localStorage.getItem("princeCart")) || [];

document.addEventListener("DOMContentLoaded", function () {

    // Find ALL product buttons
    const buttons = document.querySelectorAll(".product-card button");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Find the product card
            const productCard = button.closest(".product-card");

            // Product name
            const name = productCard.querySelector("h3").textContent.trim();

            // Product price
            const priceText = productCard.querySelector(".price .new").textContent.trim();

            // Convert price to number
            const price = parseFloat(
                priceText.replace(/[^0-9.]/g, "")
            );

            // Check if product is already in cart
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
            localStorage.setItem(
                "princeCart",
                JSON.stringify(cart)
            );

            // Show confirmation
            alert(name + " has been added to your cart!");

            console.log("Cart:", cart);
        });

    });

});
