// ==========================================
// PRINCE ONLINE SHOP - SHOPPING CART
// ==========================================

let cart = JSON.parse(localStorage.getItem("princeCart")) || [];

// Find all Add To Cart buttons
document.addEventListener("DOMContentLoaded", function () {

    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Find the product card
            const productCard = button.closest(".product-card");

            if (!productCard) {
                alert("Product information not found.");
                return;
            }

            // Get product information
            const name = productCard.querySelector(".product-name")?.textContent.trim() || "Product";

            const priceElement = productCard.querySelector(".product-price");

            let price = 0;

            if (priceElement) {
                price = parseFloat(
                    priceElement.textContent.replace(/[^0-9.]/g, "")
                ) || 0;
            }

            // Check if product already exists
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
            localStorage.setItem("princeCart", JSON.stringify(cart));

            // Update cart count
            updateCartCount();

            // Message
            alert(name + " added to cart!");
        });
    });

    updateCartCount();
});


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const cartCount = cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    const cartCounters = document.querySelectorAll(".cart-count");

    cartCounters.forEach(function (counter) {
        counter.textContent = cartCount;
    });
}
