document.addEventListener("DOMContentLoaded", function () {

    /*
    ==========================================
    PRINCE ONLINE SHOP
    CHECKOUT SYSTEM
    ==========================================
    */

    // YOUR PRINCE SHOP WHATSAPP NUMBER
    const whatsappNumber = "256776704328";


    // ==========================================
    // GET CART FROM LOCAL STORAGE
    // ==========================================

    let cart = [];

    try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
        cart = [];
    }


    // ==========================================
    // HTML ELEMENTS
    // ==========================================

    const orderItems = document.getElementById("order-items");
    const orderTotal = document.getElementById("order-total");
    const checkoutForm = document.getElementById("checkout-form");


    // ==========================================
    // SHOW CART
    // ==========================================

    function displayCart() {

        orderItems.innerHTML = "";

        if (!Array.isArray(cart) || cart.length === 0) {

            orderItems.innerHTML = `
                <div class="empty">

                    <h3>Your cart is empty</h3>

                    <p>
                        Please add a product before checking out.
                    </p>

                    <a href="index.html" class="shop-button">
                        Continue Shopping
                    </a>

                </div>
            `;

            orderTotal.textContent = "UGX 60000";

            return;
        }


        let total = 60000;


        cart.forEach(function (item) {

            // Accept different possible property names
            const name =
                item.name ||
                item.productName ||
                item.title ||
                "Product";


            const price = Number(
                item.price ||
                item.newPrice ||
                item.amount ||
                0
            );


            const quantity = Number(
                item.quantity ||
                item.qty ||
                1
            );


            const itemTotal = price * quantity;

            total += itemTotal;


            const productDiv = document.createElement("div");

            productDiv.className = "cart-item";

            productDiv.innerHTML = `
                <strong>${escapeHTML(name)}</strong>

                <br>

                Price:
                UGX ${price.toLocaleString()}

                <br>

                Quantity:
                ${quantity}

                <br>

                Subtotal:
                <strong>
                    UGX ${itemTotal.toLocaleString()}
                </strong>
            `;


            orderItems.appendChild(productDiv);

        });


        orderTotal.textContent =
            "UGX " + total.toLocaleString();

    }


    // ==========================================
    // SECURITY FUNCTION
    // ==========================================

    function escapeHTML(text) {

        const div = document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }


    // ==========================================
    // DISPLAY CART WHEN PAGE LOADS
    // ==========================================

    displayCart();


    // ==========================================
    // PLACE ORDER
    // ==========================================

    checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // Make sure cart is not empty

        if (!cart || cart.length === 0) {

            alert(
                "Your cart is empty. Please add a product first."
            );

            return;
        }


        // ==========================================
        // CUSTOMER INFORMATION
        // ==========================================

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


        // ==========================================
        // VALIDATE CUSTOMER INFORMATION
        // ==========================================

        if (!name) {

            alert("Please enter your full name.");

            return;
        }


        if (!phone) {

            alert("Please enter your phone number.");

            return;
        }


        if (!address) {

            alert("Please enter your delivery address.");

            return;
        }


        if (!payment) {

            alert("Please select a payment method.");

            return;
        }


        // ==========================================
        // CREATE ORDER NUMBER
        // ==========================================

        const orderNumber =
            "PR-" +
            Date.now().toString().slice(-8);


        // ==========================================
        // CALCULATE TOTAL
        // ==========================================

        let total = 0;


        // ==========================================
        // CREATE WHATSAPP MESSAGE
        // ==========================================

        let message = "";

        message += "🛒 *NEW ORDER - PRINCE ONLINE SHOP*";
        message += "\n";
        message += "━━━━━━━━━━━━━━━━━━━━";
        message += "\n\n";

        message += "📋 *ORDER NUMBER:* ";
        message += orderNumber;
        message += "\n\n";


        message += "👤 *CUSTOMER DETAILS*";
        message += "\n";

        message += "Name: ";
        message += name;
        message += "\n";

        message += "Phone: ";
        message += phone;
        message += "\n";

        if (email) {

            message += "Email: ";
            message += email;
            message += "\n";

        }

        message += "Address: ";
        message += address;
        message += "\n";

        message += "Payment: ";
        message += payment;
        message += "\n\n";


        // ==========================================
        // PRODUCTS
        // ==========================================

        message += "🛍️ *ORDER ITEMS*";
        message += "\n";


        cart.forEach(function (item, index) {

            const name =
                item.name ||
                item.productName ||
                item.title ||
                "Product";


            const price = Number(
                item.price ||
                item.newPrice ||
                item.amount ||
                0
            );


            const quantity = Number(
                item.quantity ||
                item.qty ||
                1
            );


            const itemTotal =
                price * quantity;


            total += itemTotal;


            message += "\n";

            message += (index + 1) + ". ";

            message += name;

            message += "\n";

            message += "   Price: UGX ";
            message += price.toLocaleString();

            message += "\n";

            message += "   Quantity: ";
            message += quantity;

            message += "\n";

            message += "   Subtotal: UGX ";
            message += itemTotal.toLocaleString();

            message += "\n";

        });


        // ==========================================
        // TOTAL
        // ==========================================

        message += "\n";
        message += "━━━━━━━━━━━━━━━━━━━━";
        message += "\n";

        message += "💰 *TOTAL: UGX ";
        message += total.toLocaleString();
        message += "*";

        message += "\n\n";

        message += "Thank you for shopping with PRINCE ONLINE SHOP!";


        // ==========================================
        // CREATE WHATSAPP LINK
        // ==========================================

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);


        // ==========================================
        // SAVE ORDER LOCALLY
        // ==========================================

        const order = {

            orderNumber: orderNumber,

            customer: {

                name: name,
                phone: phone,
                email: email,
                address: address,
                payment: payment

            },

            products: cart,

            total: total,

            date: new Date().toISOString()

        };


        localStorage.setItem(
            "lastOrder",
            JSON.stringify(order)
        );


        // ==========================================
        // OPEN WHATSAPP
        // ==========================================

        window.location.href = whatsappURL;

    });

});
