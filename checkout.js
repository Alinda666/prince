document.addEventListener("DOMContentLoaded", function () {

    const orderForm = document.getElementById("checkout-form");

    if (!orderForm) {
        console.error("Checkout form not found.");
        return;
    }

    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const address = document.getElementById("address").value.trim();
        const payment = document.getElementById("payment").value;

        if (!name || !phone || !address || !payment) {
            alert("Please fill in all required fields.");
            return;
        }

        // Get cart
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            alert("Your cart is empty. Please add a product first.");
            return;
        }

        // Create order list
        let orderItems = "";
        let total = 0;

        cart.forEach(function (item) {

            const quantity = item.quantity || 1;
            const price = Number(item.price) || 0;
            const itemTotal = price * quantity;

            total += itemTotal;

            orderItems +=
                "• " +
                item.name +
                " x" +
                quantity +
                " - UGX " +
                itemTotal.toLocaleString() +
                "%0A";
        });

        // WhatsApp message
        const message =
            "🛒 *NEW PRINCE ONLINE SHOP ORDER*%0A%0A" +

            "👤 *Customer:* " + encodeURIComponent(name) + "%0A" +
            "📞 *Phone:* " + encodeURIComponent(phone) + "%0A" +
            "📧 *Email:* " + encodeURIComponent(email || "Not provided") + "%0A" +
            "📍 *Delivery Address:* " + encodeURIComponent(address) + "%0A" +
            "💳 *Payment:* " + encodeURIComponent(payment) + "%0A%0A" +

            "📦 *ORDER ITEMS*%0A" +
            orderItems +

            "%0A💰 *TOTAL: UGX " +
            total.toLocaleString() +
            "*%0A%0A" +

            "Thank you for shopping with PRINCE ONLINE SHOP.";

        // Your PRINCE WhatsApp number
        const whatsappNumber = "256776704328";

        // Open WhatsApp
        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            message;

        window.open(whatsappURL, "_blank");

        // Clear cart after order
        localStorage.removeItem("cart");

        alert(
            "Order prepared successfully! WhatsApp will open with your order details. Please press SEND in WhatsApp."
        );
    });

});
