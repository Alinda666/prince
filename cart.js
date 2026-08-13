document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ADD PRODUCTS TO CART
    // ==========================================

    const addButtons = document.querySelectorAll(".add-to-cart");

    addButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name = button.dataset.name;
            const price = Number(button.dataset.price);

            console.log("PRODUCT:", name, price);

            if (!name || !price) {
                alert("ERROR: Product name or price is missing.");
                return;
            }

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existingProduct = cart.find(function (item) {
                return item.name === name;
            });

            if (existingProduct) {

                existingProduct.quantity =
                    Number(existingProduct.quantity) + 1;

            } else {

                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });

            }

            localStorage.setItem("cart", JSON.stringify(cart));

alert(name + " added to cart!");
            );

            console.log("CART SAVED:", cart);

            alert(
                name +
                " added to cart!\nPrice: UGX " +
                price.toLocaleString()
            );

        });

    });


    // ==========================================
    // DISPLAY CART
    // ==========================================

    const cartContainer =
        document.getElementById("cart-items");

    if (!cartContainer) {
        return;
    }

    displayCart();


    function displayCart() {

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        console.log("CART LOADED:", cart);

        cartContainer.innerHTML = "";

        let total = 0;


        // EMPTY CART

        if (cart.length === 0) {

            cartContainer.innerHTML = `
                <div class="empty-cart">

                    <h2>Your cart is empty</h2>

                    <p>
                        Please add a product before checking out.
                    </p>

                    <a
                        href="index.html"
                        class="shop-button">
                        Continue Shopping
                    </a>

                </div>
            `;

            document.getElementById("cart-subtotal").textContent =
                "UGX 0";

            document.getElementById("cart-total").textContent =
                "UGX 0";

            return;
        }


        // SHOW PRODUCTS

        cart.forEach(function (item, index) {

            const price = Number(item.price);
            const quantity = Number(item.quantity);

            const itemTotal = price * quantity;

            total += itemTotal;

            const div = document.createElement("div");

            div.className = "cart-item";

            div.innerHTML = `

                <div>

                    <div class="product-name">
                        ${item.name}
                    </div>

                    <div class="product-price">
                        Price: UGX ${price.toLocaleString()}
                    </div>

                </div>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                    <span>${quantity}</span>

                    <button
                        onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                </div>

                <div class="item-total">

                    UGX ${itemTotal.toLocaleString()}

                </div>

                <button
                    class="remove-button"
                    onclick="removeProduct(${index})">

                    Remove

                </button>
            `;

            cartContainer.appendChild(div);

        });


        document.getElementById("cart-subtotal").textContent =
            "UGX " + total.toLocaleString();

        document.getElementById("cart-total").textContent =
            "UGX " + total.toLocaleString();

    }

});


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(index, amount) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart[index]) {
        return;
    }

    cart[index].quantity =
        Number(cart[index].quantity) + amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    location.reload();
}


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeProduct(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    location.reload();
}
