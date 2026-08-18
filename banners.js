document.addEventListener("DOMContentLoaded", function () {

    const bannerTrack = document.querySelector(".banner-track");
    const banners = document.querySelectorAll(".promo-banner");

    if (!bannerTrack || banners.length === 0) {
        console.log("Promotional banners not found.");
        return;
    }

    let currentBanner = 0;
    let autoSlide;

    // ==============================
    // SHOW BANNER
    // ==============================

    function showBanner(index) {

        const bannerWidth = bannerTrack.clientWidth;

        bannerTrack.scrollTo({
            left: index * bannerWidth,
            behavior: "smooth"
        });

        currentBanner = index;
    }


    // ==============================
    // NEXT BANNER
    // ==============================

    function nextBanner() {

        currentBanner++;

        if (currentBanner >= banners.length) {
            currentBanner = 0;
        }

        showBanner(currentBanner);
    }


    // ==============================
    // START AUTOMATIC SLIDE
    // ==============================

    function startAutoSlide() {

        clearInterval(autoSlide);

        autoSlide = setInterval(function () {

            nextBanner();

        }, 4000);

    }


    // ==============================
    // STOP AUTOMATIC SLIDE
    // ==============================

    function stopAutoSlide() {

        clearInterval(autoSlide);

    }


    // ==============================
    // PAUSE WHEN HOVERING
    // ==============================

    bannerTrack.addEventListener("mouseenter", function () {

        stopAutoSlide();

    });


    // ==============================
    // RESUME AFTER HOVER
    // ==============================

    bannerTrack.addEventListener("mouseleave", function () {

        startAutoSlide();

    });


    // ==============================
    // START
    // ==============================

    startAutoSlide();


    // ==============================
    // MANUAL HORIZONTAL SCROLL
    // ==============================

    let isDragging = false;
    let startX;
    let startScrollLeft;


    bannerTrack.addEventListener("mousedown", function (e) {

        isDragging = true;

        bannerTrack.classList.add("dragging");

        startX = e.pageX - bannerTrack.offsetLeft;

        startScrollLeft = bannerTrack.scrollLeft;

        stopAutoSlide();

    });


    bannerTrack.addEventListener("mousemove", function (e) {

        if (!isDragging) return;

        e.preventDefault();

        const x = e.pageX - bannerTrack.offsetLeft;

        const walk = x - startX;

        bannerTrack.scrollLeft =
            startScrollLeft - walk;

    });


    bannerTrack.addEventListener("mouseup", function () {

        isDragging = false;

        bannerTrack.classList.remove("dragging");

        startAutoSlide();

    });


    bannerTrack.addEventListener("mouseleave", function () {

        if (isDragging) {

            isDragging = false;

            bannerTrack.classList.remove("dragging");

            startAutoSlide();

        }

    });


    // ==============================
    // TOUCH SWIPE
    // ==============================

    let touchStartX = 0;

    bannerTrack.addEventListener("touchstart", function (e) {

        touchStartX = e.touches[0].clientX;

        stopAutoSlide();

    });


    bannerTrack.addEventListener("touchend", function (e) {

        const touchEndX = e.changedTouches[0].clientX;

        const difference = touchStartX - touchEndX;

        if (difference > 50) {

            nextBanner();

        }

        else if (difference < -50) {

            currentBanner--;

            if (currentBanner < 0) {
                currentBanner = banners.length - 1;
            }

            showBanner(currentBanner);

        }

        startAutoSlide();

    });

});

/* ==========================================
   PRINCE SHOP - FINAL PRODUCT GRID FIX
========================================== */

.products {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 20px;
    box-sizing: border-box;
}

.products h2 {
    margin-bottom: 35px;
}

/* PRODUCT GRID */
.products-grid {
    display: grid !important;
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    gap: 20px !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
}

/* EVERY PRODUCT CARD */
.products-grid > .product-card {
    display: flex !important;
    flex-direction: column !important;

    width: auto !important;
    min-width: 0 !important;
    max-width: none !important;

    grid-column: auto !important;
    grid-row: auto !important;

    box-sizing: border-box !important;

    overflow: hidden !important;
    position: relative !important;
}

/* PRODUCT IMAGE */
.products-grid > .product-card > img {
    display: block !important;

    width: 100% !important;
    height: 250px !important;

    max-width: 100% !important;
    object-fit: cover !important;

    box-sizing: border-box !important;
}

/* PRODUCT NAME */
.products-grid > .product-card > h3 {
    width: 100% !important;
    box-sizing: border-box !important;

    margin: 15px 0 10px !important;
    padding: 0 10px !important;

    text-align: center !important;
}

/* PRICE */
.products-grid > .product-card > .price {
    width: 100% !important;
    box-sizing: border-box !important;

    text-align: center !important;
    padding: 0 10px !important;
}

/* ADD TO CART */
.products-grid > .product-card > .add-to-cart {
    width: calc(100% - 30px) !important;
    margin: 20px 15px !important;

    box-sizing: border-box !important;
}

/* DISCOUNT */
.products-grid > .product-card > .discount {
    position: absolute !important;
    top: 15px !important;
    left: 15px !important;
    z-index: 5 !important;
}


/* ==========================================
   TABLET
========================================== */

@media (max-width: 900px) {

    .products-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        gap: 15px !important;
    }

    .products-grid > .product-card > img {
        height: 220px !important;
    }
}


/* ==========================================
   MOBILE - EXACTLY 2 PRODUCTS PER ROW
========================================== */

@media (max-width: 700px) {

    .products {
        padding: 30px 8px !important;
    }

    .products-grid {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 8px !important;
        width: 100% !important;
    }

    .products-grid > .product-card {
        width: auto !important;
        min-width: 0 !important;
        max-width: none !important;

        grid-column: auto !important;
        grid-row: auto !important;
    }

    .products-grid > .product-card > img {
        width: 100% !important;
        height: 180px !important;
        object-fit: cover !important;
    }

    .products-grid > .product-card > h3 {
        font-size: 17px !important;
        line-height: 1.2 !important;
        padding: 0 5px !important;
    }

    .products-grid > .product-card > .price {
        font-size: 15px !important;
        padding: 0 5px !important;
    }

    .products-grid > .product-card > .add-to-cart {
        width: calc(100% - 16px) !important;
        margin: 12px 8px !important;

        padding: 12px 5px !important;
        font-size: 14px !important;
    }

    .products-grid > .product-card > .discount {
        top: 8px !important;
        left: 8px !important;

        padding: 8px 10px !important;
        font-size: 13px !important;
    }
}
