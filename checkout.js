document.addEventListener("DOMContentLoaded", function () {

    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Get elements from checkout.html
    const orderItems = document.getElementById("order-items");
    const orderTotal = document.getElementById("order-total");
    const form = document.getElementById("checkout-form");

    // Calculate and display the cart
    if (cart.length === 0) {

        orderItems.innerHTML = `
            <div class="empty">
                <h3>Your cart is empty</h3>
                <p>Please add a product before checking out.</p>
                <a href="index.html" class="shop-button">
                    Continue Shopping
                </a>
            </div>
        `;

        orderTotal.textContent = "UGX 0";

        return;
    }

    let total = 0;

    let itemsHTML = "";

    cart.forEach(function (item) {

        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;

        const itemTotal = price * quantity;

        total += itemTotal;

        itemsHTML += `
            <div class="cart-item">
                <strong>${item.name}</strong><br>
                Price: UGX ${price.toLocaleString()}<br>
                Quantity: ${quantity}<br>
                Subtotal: UGX ${itemTotal.toLocaleString()}
            </div>
        `;
    });

    orderItems.innerHTML = itemsHTML;

    orderTotal.textContent =
        "UGX " + total.toLocaleString();


    // PLACE ORDER
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const payment =
            document.getElementById("payment").value;


        // Check required information
        if (!name || !phone || !address || !payment) {

            alert("Please fill in all required information.");

            return;
        }


        // Create WhatsApp order message
        let message =
            "🛒 NEW ORDER - PRINCE ONLINE SHOP\n\n";

        message +=
            "👤 Customer: " + name + "\n";

        message +=
            "📞 Phone: " + phone + "\n";

        if (email) {

            message +=
                "📧 Email: " + email + "\n";
        }

        message +=
            "📍 Delivery Address: " + address + "\n";

        message +=
            "💳 Payment Method: " + payment + "\n\n";


        message +=
            "🛍️ ORDER ITEMS\n";

        message +=
            "-------------------------\n";


        cart.forEach(function (item) {

            const price =
                Number(item.price) || 0;

            const quantity =
                Number(item.quantity) || 1;

            const itemTotal =
                price * quantity;

            message +=
                "• " +
                item.name +
                " × " +
                quantity +
                " = UGX " +
                itemTotal.toLocaleString() +
                "\n";
        });


        message +=
            "-------------------------\n";

        message +=
            "💰 TOTAL: UGX " +
            total.toLocaleString();


        // YOUR SHOP WHATSAPP NUMBER
        const whatsappNumber =
            "256776704328";


        // Create WhatsApp URL
        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);


        // Open WhatsApp
        window.open(whatsappURL, "_blank");


        // DO NOT REMOVE THE CART YET
        // Customer must send the WhatsApp message first.

    });

});
