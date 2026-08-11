document.addEventListener("DOMContentLoaded", function () {

    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const orderContainer = document.getElementById("checkout-items");
    const totalElement = document.getElementById("checkout-total");
    const form = document.getElementById("checkout-form");

    // Check if cart is empty
    if (cart.length === 0) {

        if (orderContainer) {
            orderContainer.innerHTML = `
                <div class="empty-cart">
                    <h2>Your cart is empty</h2>
                    <p>Please add a product before checking out.</p>
                    <a href="index.html">Continue Shopping</a>
                </div>
            `;
        }

        if (totalElement) {
            totalElement.textContent = "UGX 0";
        }

        return;
    }

    // Calculate total
    let total = 0;
    let html = "";

    cart.forEach(function (item) {

        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        const itemTotal = price * quantity;

        total += itemTotal;

        html += `
            <div class="checkout-product">
                <strong>${item.name}</strong>

                <span>
                    ${quantity} × UGX ${price.toLocaleString()}
                </span>

                <strong>
                    UGX ${itemTotal.toLocaleString()}
                </strong>
            </div>
        `;
    });

    // Display products
    if (orderContainer) {
        orderContainer.innerHTML = html;
    }

    // Display total
    if (totalElement) {
        totalElement.textContent =
            "UGX " + total.toLocaleString();
    }


    // PLACE ORDER
    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            // Get customer information
            const nameElement = document.getElementById("name");
            const phoneElement = document.getElementById("phone");
            const emailElement = document.getElementById("email");
            const addressElement = document.getElementById("address");
            const paymentElement = document.getElementById("payment");

            if (
                !nameElement ||
                !phoneElement ||
                !emailElement ||
                !addressElement ||
                !paymentElement
            ) {
                alert("Checkout form fields are missing.");
                return;
            }

            const name = nameElement.value.trim();
            const phone = phoneElement.value.trim();
            const email = emailElement.value.trim();
            const address = addressElement.value.trim();
            const payment = paymentElement.value;

            // Validate
            if (!name || !phone || !address || !payment) {
                alert("Please fill in all required information.");
                return;
            }


            // =========================
            // CREATE WHATSAPP MESSAGE
            // =========================

            let message =
                "🛒 NEW ORDER - PRINCE ONLINE SHOP\n\n";

            message +=
                "👤 Customer: " + name + "\n";

            message +=
                "📞 Phone: " + phone + "\n";

            message +=
                "📧 Email: " + email + "\n";

            message +=
                "📍 Delivery Address: " + address + "\n";

            message +=
                "💳 Payment: " + payment + "\n\n";


            message +=
                "🛍️ ORDER ITEMS\n";

            message +=
                "------------------------\n";


            // Add products
            cart.forEach(function (item) {

                const price = Number(item.price) || 0;
                const quantity = Number(item.quantity) || 1;

                const itemTotal = price * quantity;

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
                "\n------------------------\n";

            message +=
                "💰 TOTAL: UGX " +
                total.toLocaleString() +
                "\n\n";

            message +=
                "Thank you for shopping with PRINCE ONLINE SHOP.";


            // =========================
            // YOUR WHATSAPP NUMBER
            // =========================

            const whatsappNumber = "256776704328";


            // Encode the complete message
            const encodedMessage =
                encodeURIComponent(message);


            // WhatsApp URL
            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodedMessage;


            // Open WhatsApp
            window.open(whatsappURL, "_blank");


            // IMPORTANT:
            // Do not immediately delete the cart.
            // Keep it until the customer has opened WhatsApp.

            setTimeout(function () {

                localStorage.removeItem("cart");

            }, 3000);

        });

    }

});
