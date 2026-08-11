// ==========================================
// PRINCE ONLINE SHOP
// CART SYSTEM
// ==========================================

const CART_KEY = "princeCart";


// ==========================================
// GET CART
// ==========================================

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem(CART_KEY)
        ) || [];

    } catch (error) {

        console.error("Cart error:", error);

        return [];
    }
}


// ==========================================
// SAVE CART
// ==========================================

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );
}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(name, price, image = "") {

    price = Number(price);

    if (!name || isNaN(price)) {

        alert("Product information is incorrect.");

        return;
    }

    let cart = getCart();

    const existingProduct = cart.find(
        product => product.name === name
    );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            name: name,

            price: price,

            image: image,

            quantity: 1

        });
    }


    saveCart(cart);

    updateCartCount();

    alert(name + " added to cart!");
}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(

        (total, product) =>
            total + product.quantity,

        0
    );


    const cartCount =
        document.getElementById("cart-count");


    if (cartCount) {

        cartCount.textContent = count;
    }
}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    if (!cartItems) {

        return;
    }


    const cart = getCart();


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h2>Your cart is empty</h2>

                <p>
                    Please add a product first.
                </p>

                <a href="index.html">
                    Continue Shopping
                </a>

            </div>

        `;


        if (cartTotal) {

            cartTotal.textContent = "UGX 0";
        }

        return;
    }


    let total = 0;


    cart.forEach((product, index) => {

        const subtotal =
            product.price * product.quantity;


        total += subtotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                ${
                    product.image
                    ?
                    `
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="cart-image"
                    >
                    `
                    :
                    ""
                }


                <div class="cart-info">

                    <h3>
                        ${product.name}
                    </h3>


                    <p>
                        Price:
                        UGX
                        ${product.price.toLocaleString()}
                    </p>


                    <div class="quantity">

                        <button
                            onclick="decreaseQuantity(${index})"
                        >
                            −
                        </button>


                        <span>
                            ${product.quantity}
                        </span>


                        <button
                            onclick="increaseQuantity(${index})"
                        >
                            +
                        </button>

                    </div>


                    <p class="subtotal">

                        UGX
                        ${subtotal.toLocaleString()}

                    </p>


                    <button
                        class="remove-button"
                        onclick="removeFromCart(${index})"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;
    });


    if (cartTotal) {

        cartTotal.textContent =
            "UGX " + total.toLocaleString();
    }
}


// ==========================================
// INCREASE QUANTITY
// ==========================================

function increaseQuantity(index) {

    let cart = getCart();


    if (!cart[index]) {

        return;
    }


    cart[index].quantity += 1;


    saveCart(cart);

    displayCart();

    updateCartCount();
}


// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseQuantity(index) {

    let cart = getCart();


    if (!cart[index]) {

        return;
    }


    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);
    }


    saveCart(cart);

    displayCart();

    updateCartCount();
}


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeFromCart(index) {

    let cart = getCart();


    if (!cart[index]) {

        return;
    }


    cart.splice(index, 1);


    saveCart(cart);

    displayCart();

    updateCartCount();
}


// ==========================================
// CLEAR CART
// ==========================================

function clearCart() {

    localStorage.removeItem(CART_KEY);

    displayCart();

    updateCartCount();
}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();

        updateCartCount();

    }
);
