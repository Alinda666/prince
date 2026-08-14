// ==========================================
// PRINCE ONLINE SHOP - CART.JS
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // Get cart from browser storage
    let cart = JSON.parse(localStorage.getItem("princeCart")) || [];

    // Find the cart container
    const cartContainer = document.querySelector("#cart-items");

    // Find subtotal and total elements
    const subtotalElement = document.querySelector("#cart-subtotal");
    const totalElement = document.querySelector("#cart-total");

    // Display cart
    function displayCart() {

        if (!cartContainer) {
            console.error("Cart container #cart-items was not found.");
            return;
        }

        // Empty cart
        if (cart.length === 0) {

            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <h2>Your cart is empty</h2>
                    <p>Add some products to your cart.</p>

                    <a href="index.html" class="continue-shopping">
                        Continue Shopping
                    </a>
                </div>
            `;

            updateTotals();
            return;
        }

        // Clear previous cart
        cartContainer.innerHTML = "";

        // Display every product
        cart.forEach(function (product, index) {

            const item = document.createElement("div");

            item.className = "cart-item";

            item.innerHTML = `
                <div class="cart-product">
                    <h3>${product.name}</h3>
                    <p>Price: UGX ${Number(product.price).toLocaleString()}</p>
                </div>

                <div class="cart-quantity">

                    <button 
                        class="quantity-btn decrease"
                        data-index="${index}">
                        −
                    </button>

                    <span class="quantity">
                        ${product.quantity}
                    </span>

                    <button 
                        class="quantity-btn increase"
                        data-index="${index}">
                        +
                    </button>

                </div>

                <div class="cart-price">
                    UGX ${(Number(product.price) * product.quantity).toLocaleString()}
                </div>

                <button 
                    class="remove-btn"
                    data-index="${index}">
                    Remove
                </button>
            `;

            cartContainer.appendChild(item);
        });

        updateTotals();
    }


    // ==========================================
    // UPDATE TOTALS
    // ==========================================

    function updateTotals() {

        let subtotal = 0;

        cart.forEach(function (product) {

            subtotal += Number(product.price) * product.quantity;

        });

        if (subtotalElement) {
            subtotalElement.textContent =
                "UGX " + subtotal.toLocaleString();
        }

        if (totalElement) {
            totalElement.textContent =
                "UGX " + subtotal.toLocaleString();
        }
    }


    // ==========================================
    // CART BUTTONS
    // ==========================================

    if (cartContainer) {

        cartContainer.addEventListener("click", function (event) {

            const index = event.target.dataset.index;

            // Increase quantity
            if (event.target.classList.contains("increase")) {

                cart[index].quantity += 1;

                saveCart();

                displayCart();
            }


            // Decrease quantity
            if (event.target.classList.contains("decrease")) {

                cart[index].quantity -= 1;

                // Remove product if quantity becomes zero
                if (cart[index].quantity <= 0) {
                    cart.splice(index, 1);
                }

                saveCart();

                displayCart();
            }


            // Remove product
            if (event.target.classList.contains("remove-btn")) {

                cart.splice(index, 1);

                saveCart();

                displayCart();
            }

        });

    }


    // ==========================================
    // SAVE CART
    // ==========================================

    function saveCart() {

        localStorage.setItem(
            "princeCart",
            JSON.stringify(cart)
        );

    }


    // ==========================================
    // INITIAL DISPLAY
    // ==========================================

    displayCart();

});
