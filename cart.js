document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // PROFESSIONAL NOTIFICATION
    // ==========================================

    function showNotification(productName, price) {

        // Remove an old notification if one exists
        const oldNotification =
            document.querySelector(".cart-notification");

        if (oldNotification) {
            oldNotification.remove();
        }

        // Create notification
        const notification =
            document.createElement("div");

        notification.className = "cart-notification";

        notification.innerHTML = `
            <div class="notification-icon">
                ✓
            </div>

            <div class="notification-content">
                <strong>Added to Cart</strong>

                <span>
                    ${productName}
                </span>

                <small>
                    UGX ${price.toLocaleString()}
                </small>
            </div>

            <button class="notification-close">
                ×
            </button>
        `;

        // Add notification to page
        document.body.appendChild(notification);


        // Close button
        const closeButton =
            notification.querySelector(
                ".notification-close"
            );

        closeButton.addEventListener("click", function () {

            notification.classList.add("hide");

            setTimeout(function () {
                notification.remove();
            }, 300);

        });


        // Automatically disappear after 4 seconds
        setTimeout(function () {

            if (notification) {

                notification.classList.add("hide");

                setTimeout(function () {

                    if (notification.parentNode) {
                        notification.remove();
                    }

                }, 300);

            }

        }, 4000);

    }


    // ==========================================
    // NOTIFICATION CSS
    // ==========================================

    const notificationStyle =
        document.createElement("style");

    notificationStyle.textContent = `

        .cart-notification {

            position: fixed;

            top: 25px;
            right: 25px;

            width: 340px;

            background: white;

            color: #222;

            padding: 18px;

            border-radius: 14px;

            box-shadow:
                0 10px 35px rgba(0, 0, 0, 0.18);

            display: flex;

            align-items: center;

            gap: 14px;

            z-index: 99999;

            border-left: 5px solid #ff6600;

            animation:
                notificationSlideIn
                0.35s ease;

        }


        .notification-icon {

            width: 42px;
            height: 42px;

            border-radius: 50%;

            background: #ff6600;

            color: white;

            display: flex;

            align-items: center;
            justify-content: center;

            font-size: 22px;

            font-weight: bold;

            flex-shrink: 0;

        }


        .notification-content {

            display: flex;

            flex-direction: column;

            gap: 3px;

            flex: 1;

        }


        .notification-content strong {

            font-size: 16px;

            color: #222;

        }


        .notification-content span {

            font-size: 14px;

            color: #555;

        }


        .notification-content small {

            font-size: 13px;

            color: #ff6600;

            font-weight: bold;

        }


        .notification-close {

            border: none;

            background: transparent;

            color: #888;

            font-size: 24px;

            cursor: pointer;

            line-height: 1;

        }


        .notification-close:hover {

            color: #222;

        }


        .cart-notification.hide {

            animation:
                notificationSlideOut
                0.3s ease forwards;

        }


        @keyframes notificationSlideIn {

            from {

                opacity: 0;

                transform:
                    translateX(100px);

            }

            to {

                opacity: 1;

                transform:
                    translateX(0);

            }

        }


        @keyframes notificationSlideOut {

            from {

                opacity: 1;

                transform:
                    translateX(0);

            }

            to {

                opacity: 0;

                transform:
                    translateX(100px);

            }

        }


        @media (max-width: 600px) {

            .cart-notification {

                top: 15px;

                right: 15px;

                left: 15px;

                width: auto;

            }

        }

    `;

    document.head.appendChild(notificationStyle);


    // ==========================================
    // ADD PRODUCTS TO CART
    // ==========================================

    const addButtons =
        document.querySelectorAll(".add-to-cart");


    addButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name =
                button.getAttribute("data-name");

            const price =
                Number(
                    button.getAttribute("data-price")
                );


            // Check product information
            if (!name || isNaN(price)) {

                showNotification(
                    "Product information is missing",
                    0
                );

                return;

            }


            // Get existing cart
            let cart =
                JSON.parse(
                    localStorage.getItem("cart")
                ) || [];


            // Check if product already exists
            const existingProduct =
                cart.find(function (item) {

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


            // Save cart
            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );


            // Show professional notification
            showNotification(
                name,
                price
            );

        });

    });


    // ==========================================
    // DISPLAY CART
    // ==========================================

    const cartContainer =
        document.getElementById("cart-items");

    const subtotalElement =
        document.getElementById("cart-subtotal");

    const totalElement =
        document.getElementById("cart-total");


    // If we are not on cart.html,
    // stop here.
    if (!cartContainer) {

        return;

    }


    // Get cart
    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    // ==========================================
    // EMPTY CART
    // ==========================================

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Please add a product
                    before checking out.
                </p>

                <a
                    href="index.html"
                    class="shop-button">

                    Continue Shopping

                </a>

            </div>

        `;


        if (subtotalElement) {

            subtotalElement.textContent =
                "UGX 0";

        }


        if (totalElement) {

            totalElement.textContent =
                "UGX 0";

        }


        return;

    }


    // ==========================================
    // DISPLAY PRODUCTS
    // ==========================================

    let total = 0;


    cartContainer.innerHTML = "";


    cart.forEach(function (item, index) {

        const price =
            Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;


        const itemTotal =
            price * quantity;


        total += itemTotal;


        const itemElement =
            document.createElement("div");


        itemElement.className =
            "cart-item";


      itemElement.innerHTML = `
    <div class="product-info">

        <h3>${item.name}</h3>

        <p>
            Price: UGX ${price.toLocaleString()}
        </p>

        <div class="quantity">

            <button
                class="quantity-btn decrease"
                data-index="${index}">
                −
            </button>

            <span class="quantity-number">
                ${quantity}
            </span>

            <button
                class="quantity-btn increase"
                data-index="${index}">
                +
            </button>

        </div>

        <p class="item-subtotal">
            Subtotal:
            <strong>
                UGX ${itemTotal.toLocaleString()}
            </strong>
        </p>

        <button
            class="remove"
            data-index="${index}">
            Remove
        </button>

    </div>
`;


        cartContainer.appendChild(
            itemElement
        );

    });


    // ==========================================
    // UPDATE TOTALS
    // ==========================================

    if (subtotalElement) {

        subtotalElement.textContent =
            "UGX " + total.toLocaleString();

    }


    if (totalElement) {

        totalElement.textContent =
            "UGX " + total.toLocaleString();

    }


    // ==========================================
    // REMOVE PRODUCTS
    // ==========================================

    const removeButtons =
        document.querySelectorAll(".remove");


    removeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(
                        button.getAttribute(
                            "data-index"
                        )
                    );


                let cart =
                    JSON.parse(
                        localStorage.getItem("cart")
                    ) || [];


                cart.splice(index, 1);


                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );


                // Refresh cart
                location.reload();

            }
        );

    });

});
