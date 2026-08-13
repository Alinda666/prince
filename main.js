/* =========================================
   PRINCE ONLINE SHOP - MAIN.JS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       CART COUNT
    ===================================== */

    function updateCartCount() {

        const cartCount = document.getElementById("cart-count");

        if (!cartCount) {
            return;
        }

        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        let totalQuantity = 0;

        cart.forEach(function (item) {
            totalQuantity += Number(item.quantity) || 0;
        });

        cartCount.textContent = totalQuantity;
    }


    /* =====================================
       ADD TO CART
    ===================================== */

    const addButtons =
        document.querySelectorAll(".add-to-cart");

    addButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name =
                button.getAttribute("data-name");

            const price =
                Number(button.getAttribute("data-price"));

            if (!name || !price) {

                alert("Product information is missing.");

                return;
            }

            let cart =
                JSON.parse(localStorage.getItem("cart")) || [];

            const existingProduct =
                cart.find(function (item) {

                    return item.name === name;

                });


            if (existingProduct) {

                existingProduct.quantity += 1;

            } else {

                cart.push({

                    name: name,
                    price: price,
                    quantity: 1

                });

            }


            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );


            updateCartCount();


            /* Button feedback */

            const originalText =
                button.textContent;

            button.textContent =
                "✓ Added";

            button.disabled = true;


            setTimeout(function () {

                button.textContent =
                    originalText;

                button.disabled = false;

            }, 1000);

        });

    });


    /* =====================================
       SEARCH PRODUCTS
    ===================================== */

    const searchInput =
        document.querySelector(".search-box input");

    const productCards =
        document.querySelectorAll(".product-card");


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const searchText =
                    searchInput.value
                    .toLowerCase()
                    .trim();


                productCards.forEach(
                    function (card) {

                        const productName =
                            card
                            .querySelector("h3");

                        if (!productName) {
                            return;
                        }


                        const name =
                            productName.textContent
                            .toLowerCase();


                        if (
                            name.includes(searchText)
                        ) {

                            card.style.display =
                                "";

                        } else {

                            card.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    }


    /* =====================================
       SHOP NOW BUTTON
    ===================================== */

    const shopButtons =
        document.querySelectorAll(
            ".btn, .banner-button"
        );


    shopButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                const products =
                    document.querySelector(
                        ".products"
                    );

                if (products) {

                    event.preventDefault();

                    products.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


    /* =====================================
       UPDATE CART WHEN PAGE LOADS
    ===================================== */

    updateCartCount();


    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuButton =
        document.querySelector(".menu-button");

    const navLinks =
        document.querySelector(".nav-links");


    if (menuButton && navLinks) {

        menuButton.addEventListener(
            "click",
            function () {

                navLinks.classList.toggle(
                    "active"
                );

            }
        );

    }


    /* =====================================
       NEWSLETTER
    ===================================== */

    const newsletterButton =
        document.querySelector(
            ".newsletter button"
        );

    const newsletterInput =
        document.querySelector(
            ".newsletter input"
        );


    if (
        newsletterButton &&
        newsletterInput
    ) {

        newsletterButton.addEventListener(
            "click",
            function () {

                const email =
                    newsletterInput.value.trim();


                if (!email) {

                    alert(
                        "Please enter your email address."
                    );

                    return;

                }


                alert(
                    "Thank you for subscribing!"
                );


                newsletterInput.value = "";

            }
        );

    }

});
