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

