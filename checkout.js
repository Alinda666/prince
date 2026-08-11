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

        let message = "🛒 NEW ORDER - PRINCE ONLINE SHOP\n\n";

        message += "👤 Customer: " + name + "\n";
        message += "📞 Phone: " + phone + "\n";
        message += "📧 Email: " + email + "\n";
        message += "📍 Delivery Address: " + address + "\n";
        message += "💳 Payment: " + payment + "\n\n";

        message += "🛍️ ORDER ITEMS\n";

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
                "\n";
        });

        message += "\n💰 TOTAL: UGX " +
            total.toLocaleString();

        // YOUR SHOP WHATSAPP NUMBER
        const whatsappNumber = "256776704328";

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);

        // Open WhatsApp
        window.open(whatsappURL, "_blank");

    });

}
