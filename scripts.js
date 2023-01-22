
const modalContainer = document.querySelector(".modal-container");
const modalContent = document.querySelector(".modal-content");

document.addEventListener("DOMContentLoaded", function() {
    addHeader();
    insertImages();    
    addFooter();
    scrollIntoFooter();
    setCarousel("phone");
    setCarousel("desk");
    //startCarousel();
});

modalContent.addEventListener("click", function(e) { 
    e.stopPropagation();
});

// Functions

// Add the Header
function addHeader() {
    const header = document.querySelector("#navbar-header");
    header.innerHTML = `
            <nav class="navbar-header">
                <a href="/" class="brand-link">                    
                    <i class="fa-solid fa-leaf"></i>
                    <span class="brand"> Galy </span>
                </a>
                <a href="#navbar-header" class="navbar-menu-mobile open">
                    <i class="fa-solid fa-bars"></i>
                </a>
                <a href="#" class="navbar-menu-mobile close">
                    <i class="fa-solid fa-xmark"></i>
                </a>                
            </nav>
            <nav class="navbar-container">
                    <a href="/" class="navbar-link navbar-link-active">
                        <i class="fa-solid fa-house"></i> Home
                    </a>
                    <a href="phone.html" class="navbar-link">
                        <i class="fa-solid fa-mobile"></i> Only Phone
                    </a>
                    <a href="desk.html" class="navbar-link">
                        <i class="fa-solid fa-desktop"></i> Only Desktop
                    </a>              
                    <a href="#phoneFooter" class="navbar-link" id="contact">
                        <i class="fa-solid fa-circle-info"></i> Contact
                    </a>                
            </nav>`;
}

// Add the Footer
function addFooter() {
    const footer = document.querySelector("#footer");
    footer.innerHTML = `
            <img class="icon" src="images/GY.png" title="Galy">
            <div class="about-me">                         
                <h3 class="title"> Follow me </h3>                
                <div class="social">
                    <div class="ig">
                        <a href="https://www.instagram.com/YourFriendlyADC/" target="_blank">
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                    </div>                
                    <div class="tt">
                        <a href="https://twitter.com/yourfriendlyadc" target="_blank">                        
                            <i class="fa-brands fa-twitter"></i>
                        </a>
                    </div>
                    <div class="pt">
                        <a href="https://www.pinterest.com/yourfriendlyadc/" target="_blank">
                            <i class="fa-brands fa-pinterest"></i>
                        </a>
                    </div>
                </div>                                                         
            </div>        
            <div class="about-galy">
                <h3 class="title"> About Galy </h3>
                <p class=""description> With Galy you can look for wallpapers and download it in an easy way.
                All of these wallpapers are NOT mine, I just compilated them and put them here.
                I hope you found anyone you like and just use it! </p>                
            </div>`;
}

// Let the Smooth scroll into the footer
function scrollIntoFooter() {    
    const contactButton = document.querySelector("#contact");
    contactButton.addEventListener("click", function() {
        const footer = document.querySelector("#footer");
        footer.scrollIntoView({
            behavior: "smooth"
        });    
    });
}

function createImages(container, imagesAmount, classType) {            
    for (let i = 0; i < imagesAmount; i++) {
        const imageContainer = document.createElement(`div`);
        imageContainer.innerHTML = `
                <label for="modal-button">
                    <img class="card ${classType}" src="images/${classType}/${i}.JPG" title="image" loading="lazy">
                </label> `;
        imageContainer.onclick = function() {
            showModal(`images/${classType}/${i}.JPG`, classType);
        }        
        container.appendChild(imageContainer);        
    }
}  

function insertImages() {
    const phoneImages = document.querySelector(".phone-images");
    const deskImages = document.querySelector(".desk-images");
    createImages(deskImages, 15, "desk");
    createImages(phoneImages, 30, "phone");
}

function showModal(image, classType) {
    const modalImage = document.querySelector(".modal-container img");
    const modalDownload = document.querySelector(".modal-container a");
    const closeButton = document.querySelector(".close-button");
    modalImage.src = image;
    modalImage.classList.add(classType);
    modalDownload.href = image;
    modalContainer.style.transform = "scale(1)";
    modalContainer.style.borderRadius = "0%";
    closeButton.onclick = closeModal;
    modalContainer.onclick = closeModal;
}

function closeModal() {    
    modalContainer.style.transform = "scale(0)";
    modalContainer.style.borderRadius = "100%";    
}

function setCarousel(classType) {
    const carousel = document.querySelector(`.carrusel-${classType}`);
    const carouselItemsContainer = document.createElement('div');
    carouselItemsContainer.className = "carrusel-items";
    for (let i = 0; i < 5; i++) {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carrusel-${classType}-item`;
        carouselItem.innerHTML = `
        <img src="images/${classType}/${i}.jpg">`;
        carouselItemsContainer.appendChild(carouselItem);
    }
    carousel.appendChild(carouselItemsContainer);
}

function startCarousel() {
    setInterval (function () {        
        const carouselItemsContainer = document.querySelector(".carrusel-items");
        const car = document.querySelector(".carrusel-items div");
        carouselItemsContainer.style.left = `-${car.clientWidth}%`;
        carouselItemsContainer.style.transition = 'all ease 1s';
        setTimeout (function() {
            carouselItemsContainer.appendChild(car);
            carouselItemsContainer.style.left = '0';
            carouselItemsContainer.style.transition = 'none';
        }, 200);
    }, 1000);
};
