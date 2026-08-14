document.addEventListener("DOMContentLoaded", function () {

    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const orderItems = document.getElementById("order-items");
    const orderTotal = document.getElementById("order-total");
    const checkoutForm = document.getElementById("checkout-form");

    // Check if cart is empty
    if (cart.length === 0) {

        orderItems.innerHTML = `
            <div style="text-align:center; padding:30px;">
                <h3>Your cart is empty</h3>
                <p>Please add a product before checking out.</p>
                <a href="index.html">Continue Shopping</a>
            </div>
        `;

        orderTotal.textContent = "UGX 0";

        return;
    }

    // Calculate total
    let total = 0;

    orderItems.innerHTML = "";

    cart.forEach(function (item) {

        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        const itemTotal = price * quantity;

        total += itemTotal;

        const itemHTML = document.createElement("div");

        itemHTML.className = "cart-item";

        itemHTML.innerHTML = `
            <strong>${item.name}</strong>
            <p>
                Quantity: ${quantity}
            </p>
            <p>
                Price: UGX ${price.toLocaleString()}
            </p>
            <strong>
                Subtotal: UGX ${itemTotal.toLocaleString()}
            </strong>
        `;

        orderItems.appendChild(itemHTML);
    });

    // Display total
    orderTotal.textContent = "UGX " + total.toLocaleString();


    // PLACE ORDER
    checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const address = document.getElementById("address").value.trim();
        const payment = document.getElementById("payment").value;

        // Validate
        if (!name || !phone || !address || !payment) {

            alert("Please fill in all required information.");

            return;
        }


        // Create WhatsApp message
        let message =
            "🛒 NEW ORDER - PRINCE ONLINE SHOP\n\n";

        message +=
            "👤 Customer: " + name + "\n";

        message +=
            "📞 Phone: " + phone + "\n";

        message +=
            "📧 Email: " + (email || "Not provided") + "\n";

        message +=
            "📍 Delivery Address: " + address + "\n";

        message +=
            "💳 Payment: " + payment + "\n\n";

        message +=
            "🛍️ ORDER ITEMS\n\n";


        // Add products
        cart.forEach(function (item) {

            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 1;
            const itemTotal = price * quantity;

            message +=
                item.name +
                " × " +
                quantity +
                " = UGX " +
                itemTotal.toLocaleString() +
                "\n";
        });


        message +=
            "\n💰 TOTAL: UGX " +
            total.toLocaleString();


        // Your WhatsApp number
        const whatsappNumber = "256776704328";


        // Encode message properly
        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);


        // Open WhatsApp
        window.open(whatsappURL, "_blank");


        // Clear cart after opening WhatsApp
        localStorage.removeItem("cart");

    });

});
