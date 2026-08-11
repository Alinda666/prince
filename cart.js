// ==========================================
// PRINCE ONLINE SHOP - CART SYSTEM
// ==========================================

const CART_KEY = "princeCart";

// Get cart
function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (error) {
        return [];
    }
}

// Save cart
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Add product to cart
function addToCart(name, price, image = "") {

    price = Number(price);

    if (!name || isNaN(price)) {
        alert("Product information is missing.");
        return;
    }

    let cart = getCart();

    const existingProduct = cart.find(product => product.name === name);

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

    alert(name + " has been added to your cart!");

    updateCartCount();
}

// Update cart count
function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, product) => total + product.quantity,
        0
    );

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = count;
    }
}

// Display cart
function displayCart() {

    const cartContainer = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");

    if (!cartContainer) {
        return;
    }

    const cart = getCart();

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Please add a product first.</p>
                <a href="index.html">Continue Shopping</a>
            </div>
        `;

        if (totalElement) {
            totalElement.textContent = "UGX 0";
        }

        return;
    }

    let total = 0;

    cart.forEach((product, index) => {

        const subtotal = product.price * product.quantity;

        total += subtotal;

        cartContainer.innerHTML += `

            <div class="cart-item">

                ${
                    product.image
                    ? `<img src="${product.image}" alt="${product.name}">`
                    : ""
                }

                <div class="cart-product-info">

                    <h3>${product.name}</h3>

                    <p>
                        Price:
                        UGX ${product.price.toLocaleString()}
                    </p>

                    <div class="quantity-controls">

                        <button onclick="decreaseQuantity(${index})">
                            −
                        </button>

                        <span>${product.quantity}</span>

                        <button onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>

                    <h3>
                        UGX ${subtotal.toLocaleString()}
                    </h3>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(${index})">
                        Remove
                    </button>

                </div>

            </div>
        `;
    });

    if (totalElement) {
        totalElement.textContent =
            "UGX " + total.toLocaleString();
    }
}

// Increase quantity
function increaseQuantity(index) {

    let cart = getCart();

    cart[index].quantity += 1;

    saveCart(cart);

    displayCart();
    updateCartCount();
}

// Decrease quantity
function decreaseQuantity(index) {

    let cart = getCart();

    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);

    }

    saveCart(cart);

    displayCart();
    updateCartCount();
}

// Remove product
function removeFromCart(index) {

    let cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    displayCart();
    updateCartCount();
}

// Clear cart
function clearCart() {

    localStorage.removeItem(CART_KEY);

    displayCart();
    updateCartCount();
}

// Run when page loads
document.addEventListener("DOMContentLoaded", function () {

    displayCart();

    updateCartCount();

});
