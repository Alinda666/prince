document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // ADD PRODUCTS TO CART
    // ==============================

    const addButtons = document.querySelectorAll(".add-to-cart");

    addButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name = button.getAttribute("data-name");
            const price = Number(button.getAttribute("data-price"));

            if (!name || isNaN(price)) {
                alert("Product information is missing.");
                return;
            }

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

            localStorage.setItem("cart", JSON.stringify(cart));

            alert(
                name +
                " added to cart!\nPrice: UGX " +
                price.toLocaleString()
            );

        });

    });


    // ==============================
    // DISPLAY CART
    // ==============================

    const cartContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("cart-subtotal");
    const totalElement = document.getElementById("cart-total");

    if (cartContainer) {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {

            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <h2>Your cart is empty</h2>
                    <p>Please add a product before checking out.</p>
                </div>
            `;

            if (subtotalElement) {
                subtotalElement.textContent = "UGX 0";
            }

            if (totalElement) {
                totalElement.textContent = "UGX 0";
            }

            return;
        }


        let total = 0;

        cartContainer.innerHTML = "";


        cart.forEach(function (item, index) {

            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 1;

            const itemTotal = price * quantity;

            total += itemTotal;


            const itemHTML = document.createElement("div");

            itemHTML.className = "cart-item";

            itemHTML.innerHTML = `
                <div>
                    <h3>${item.name}</h3>

                    <p>
                        UGX ${price.toLocaleString()}
                        ×
                        ${quantity}
                    </p>

                    <strong>
                        UGX ${itemTotal.toLocaleString()}
                    </strong>
                </div>

                <button
                    class="remove-item"
                    data-index="${index}">
                    Remove
                </button>
            `;

            cartContainer.appendChild(itemHTML);

        });


        // Show totals

        if (subtotalElement) {
            subtotalElement.textContent =
                "UGX " + total.toLocaleString();
        }

        if (totalElement) {
            totalElement.textContent =
                "UGX " + total.toLocaleString();
        }


        // ==============================
        // REMOVE PRODUCTS
        // ==============================

        const removeButtons =
            document.querySelectorAll(".remove-item");

        removeButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const index =
                    Number(button.getAttribute("data-index"));

                let cart =
                    JSON.parse(localStorage.getItem("cart")) || [];

                cart.splice(index, 1);

                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );

                location.reload();

            });

        });

    }

});
