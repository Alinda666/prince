// ==========================
// PRINCE ONLINE SHOP
// Main JavaScript
// ==========================

// --------------------------
// Flash Sale Countdown
// --------------------------

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 5);

function updateCountdown() {

    const now = new Date().getTime();

    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(document.getElementById("days")){

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;

    }

}

setInterval(updateCountdown,1000);

updateCountdown();


// --------------------------
// Shopping Cart
// --------------------------

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price){

    cart.push({
        name,
        price,
        qty:1
    });

    localStorage.setItem("cart",JSON.stringify(cart));

    alert(name + " added to cart.");

}


// Automatically connect buttons

document.querySelectorAll(".product-card").forEach(card=>{

    const btn = card.querySelector("button");

    if(btn){

        const title = card.querySelector("h3").innerText;

        const price = card.querySelector(".new").innerText.replace("$","");

        btn.addEventListener("click",()=>{

            addToCart(title,price);

        });

    }

});


// --------------------------
// Search Box
// --------------------------

const searchInput = document.querySelector(".search-box input");

if(searchInput){

searchInput.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

document.querySelectorAll(".product-card").forEach(card=>{

const title=card.querySelector("h3").innerText.toLowerCase();

if(title.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}


// --------------------------
// Smooth Scroll
// --------------------------

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior:"smooth"

});

});

});


// --------------------------
// Reveal Animation
// --------------------------

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity=1;

entry.target.style.transform="translateY(0)";

}

});

});

document.querySelectorAll(".product-card,.category-card").forEach(item=>{

item.style.opacity=0;

item.style.transform="translateY(40px)";

item.style.transition=".6s";

observer.observe(item);

});


// --------------------------
// Dark Mode
// --------------------------

const darkBtn=document.createElement("button");

darkBtn.innerHTML="🌙";

darkBtn.style.position="fixed";

darkBtn.style.bottom="20px";

darkBtn.style.left="20px";

darkBtn.style.width="50px";

darkBtn.style.height="50px";

darkBtn.style.borderRadius="50%";

darkBtn.style.border="none";

darkBtn.style.background="#ff6600";

darkBtn.style.color="#fff";

darkBtn.style.cursor="pointer";

darkBtn.style.fontSize="20px";

darkBtn.style.zIndex="9999";

document.body.appendChild(darkBtn);

darkBtn.onclick=function(){

document.body.classList.toggle("dark");

};


// --------------------------
// Dark Theme Styles
// --------------------------

const style=document.createElement("style");

style.innerHTML=`

.dark{

background:#121212;

color:#fff;

}

.dark .navbar,

.dark .category-card,

.dark .product-card{

background:#222;

color:#fff;

}

.dark footer{

background:#000;

}

`;

document.head.appendChild(style);

console.log("PRINCE ONLINE SHOP Loaded Successfully");