
// ===================================
// ASEPTIC FABRIC SOFTENER WEBSITE
// INTERACTIVE JAVASCRIPT
// ===================================

// 1. Welcome message
window.addEventListener("load", function () {
    console.log("Welcome to Aseptic Fabric Softener!");

});

// 2. Highlight navigation links
const navigationLinks = document.querySelectorAll("nav a");

navigationLinks.forEach(function (link) {

    if (link.href === window.location.href) {
        link.style.backgroundColor = "purple";
        link.style.color = "white";
    }

});

// 3. Mobile-friendly navigation
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
        navigation.classList.toggle("show-menu");
    });
}

// 4. Interactive product selection
const products = document.querySelectorAll("main ul li");

products.forEach(function (product) {

    product.addEventListener("click", function () {

        product.classList.toggle("selected");

        alert("You selected: " + product.textContent);

    });

});

// 5. Image zoom effect
const images = document.querySelectorAll("img");

images.forEach(function (image) {

    image.addEventListener("click", function () {
        image.classList.toggle("zoomed");
    });

});

// 6. Contact form validation
const contactForm = document.querySelector("#contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const message = document.querySelector("#message").value.trim();

        if (name === "" || email === "" || message === "") {

            alert("Please complete all the required fields.");

        } else {

            alert("Thank you " + name +
                "! Your message has been received.");

            contactForm.reset();

        }

    });

}

// 7. Enquiry form interaction
const enquiryForm = document.querySelector("#enquiryForm");

if (enquiryForm) {

    enquiryForm.addEventListener("submit", function (event) {

        event.preventDefault();

        alert("Thank you for your enquiry! We appreciate your interest.");

        enquiryForm.reset();

    });

}

// 8. Back to top button
const backToTop = document.querySelector("#backToTop");

if (backToTop) {

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

// 9. Current year in footer
const year = document.querySelector("#year");

if (year) {
    year.textContent = new Date().getFullYear();
}

}
