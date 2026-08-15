document.addEventListener("DOMContentLoaded", function () {

    const bannerContainer = document.querySelector(".banner-container");

    if (!bannerContainer) {
        console.log("Banner container not found.");
        return;
    }

    let banners = bannerContainer.querySelectorAll(".banner");

    if (banners.length <= 1) {
        return;
    }

    let currentBanner = 0;
    let autoSlide;

    // Show selected banner
    function showBanner(index) {

        banners.forEach(function (banner, i) {

            if (i === index) {
                banner.classList.add("active");
            } else {
                banner.classList.remove("active");
            }

        });

    }

    // Move to next banner
    function nextBanner() {

        currentBanner++;

        if (currentBanner >= banners.length) {
            currentBanner = 0;
        }

        showBanner(currentBanner);
    }

    // Start automatic changing
    function startAutoSlide() {

        clearInterval(autoSlide);

        autoSlide = setInterval(function () {
            nextBanner();
        }, 4000);

    }

    // Stop automatic changing
    function stopAutoSlide() {

        clearInterval(autoSlide);

    }

    // Start
    showBanner(currentBanner);
    startAutoSlide();

    // Pause when mouse is over banners
    bannerContainer.addEventListener("mouseenter", function () {
        stopAutoSlide();
    });

    // Continue when mouse leaves
    bannerContainer.addEventListener("mouseleave", function () {
        startAutoSlide();
    });


    // ==========================================
    // MANUAL HORIZONTAL SCROLLING
    // ==========================================

    let isDown = false;
    let startX;
    let scrollLeft;

    bannerContainer.addEventListener("mousedown", function (e) {

        isDown = true;

        bannerContainer.classList.add("dragging");

        startX = e.pageX - bannerContainer.offsetLeft;

        scrollLeft = bannerContainer.scrollLeft;

        stopAutoSlide();

    });

    bannerContainer.addEventListener("mouseleave", function () {

        isDown = false;

        bannerContainer.classList.remove("dragging");

        startAutoSlide();

    });

    bannerContainer.addEventListener("mouseup", function () {

        isDown = false;

        bannerContainer.classList.remove("dragging");

        startAutoSlide();

    });

    bannerContainer.addEventListener("mousemove", function (e) {

        if (!isDown) {
            return;
        }

        e.preventDefault();

        const x = e.pageX - bannerContainer.offsetLeft;

        const walk = (x - startX) * 1.5;

        bannerContainer.scrollLeft =
            scrollLeft - walk;

    });

});
