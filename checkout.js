document.addEventListener("DOMContentLoaded", function () {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const orderContainer = document.getElementById("checkout-items");
    const totalElement = document.getElementById("checkout-total");
    const form = document.getElementById("checkout-form");

    // Stop if cart is empty
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

        const itemTotal = Number(item.price) * Number(item.quantity);

        total += itemTotal;

        html += `
            <div class="checkout-product">
                <strong>${item.name}</strong>
                <span>
                    ${item.quantity} × UGX ${Number(item.price).toLocaleString()}
                </span>
                <strong>
                    UGX ${itemTotal.toLocaleString()}
                </strong>
            </div>
        `;
    });

    if (orderContainer) {
        orderContainer.innerHTML = html;
    }

    if (totalElement) {
        totalElement.textContent =
            "UGX " + total.toLocaleString();
    }


    // PLACE ORDER
    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();
            const address = document.getElementById("address").value.trim();
            const payment = document.getElementById("payment").value;

            if (!name || !phone || !address || !payment) {
                alert("Please fill in all required information.");
                return;
            }

            // Create WhatsApp message
            let message = "🛒 *NEW ORDER - PRINCE ONLINE SHOP*%0A%0A";

            message += "👤 *Customer:* " + name + "%0A";
            message += "📞 *Phone:* " + phone + "%0A";
            message += "📧 *Email:* " + email + "%0A";
            message += "📍 *Delivery:* " + address + "%0A";
            message += "💳 *Payment:* " + payment + "%0A%0A";

            message += "🛍️ *ORDER ITEMS*%0A";

            cart.forEach(function (item) {

                const itemTotal =
                    Number(item.price) * Number(item.quantity);

                message +=
                    "• " +
                    item.name +
                    " × " +
                    item.quantity +
                    " = UGX " +
                    itemTotal.toLocaleString() +
                    "%0A";
            });

            message += "%0A💰 *TOTAL: UGX " +
                total.toLocaleString() +
                "*";

            // Your WhatsApp number
            const whatsappNumber = "256776704328";

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                message;

            // Open WhatsApp
            window.open(whatsappURL, "_blank");

            // Clear cart AFTER opening WhatsApp
            localStorage.removeItem("cart");

        });

    }

});
