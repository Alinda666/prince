document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // ADD TO CART
    // =====================================

    const addButtons = document.querySelectorAll(".add-to-cart");

    addButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name = button.dataset.name;
            const price = Number(button.dataset.price);

            if (!name || !price) {
                alert("Product information is missing.");
                return;
            }

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existingProduct = cart.find(
                item => item.name === name
            );

            if (existingProduct) {

                existingProduct.quantity =
                    Number(existingProduct.quantity) + 1;

            }<button 
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

                
                });

            }

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

        });

    });


    // =====================================
    // DISPLAY CART
    // =====================================

    const cartItems =
        document.getElementById("cart-items");

    const cartSubtotal =
        document.getElementById("cart-subtotal");

    const cartTotal =
        document.getElementById("cart-total");


    // We are on index.html, so stop here
    // after setting up Add To Cart buttons.
    if (!cartItems) {
        return;
    }


    // Get saved cart
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    // =====================================
    // EMPTY CART
    // =====================================

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <h3>Your cart is empty</h3>

                <p>
                    Please add a product before checking out.
                </p>

                <a href="index.html" class="shop-button">
                    Continue Shopping
                </a>

            </div>
        `;

        cartSubtotal.textContent = "UGX 0";
        cartTotal.textContent = "UGX 0";

        return;
    }


    // =====================================
    // DISPLAY PRODUCTS
    // =====================================

    let total = 0;

    cartItems.innerHTML = "";


    cart.forEach(function (item, index) {

        const price = Number(item.price);
        const quantity = Number(item.quantity);

        const itemTotal =
            price * quantity;

        total += itemTotal;


        const product = document.createElement("div");

        product.className = "cart-item";


        product.innerHTML = `

            <div class="product-info">

                <h3>${item.name}</h3>

                <p>
                    Price:
                    UGX ${price.toLocaleString()}
                </p>

                <p>
                    Quantity:
                    ${quantity}
                </p>

            </div>


            <div class="item-total">

                UGX ${itemTotal.toLocaleString()}

            </div>


            <button
                class="remove"
                data-index="${index}">

                Remove

            </button>

        `;


        cartItems.appendChild(product);

    });


    // =====================================
    // UPDATE TOTAL
    // =====================================

    cartSubtotal.textContent =
        "UGX " + total.toLocaleString();

    cartTotal.textContent =
        "UGX " + total.toLocaleString();


    // =====================================
    // REMOVE PRODUCT
    // =====================================

    const removeButtons =
        document.querySelectorAll(".remove");


    removeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index =
                Number(button.dataset.index);

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

});
