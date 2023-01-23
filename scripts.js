
const modalContainer = document.querySelector(".modal-container");
const modalContent = document.querySelector(".modal-content");
const footer = document.querySelector("#footer");


document.addEventListener("DOMContentLoaded", function() {
    addHeader();
    setImages();    
    addFooter();
    scrollIntoFooter();
    setCarousel("phone");
    setCarousel("desk");
    startCarousel("phone");
    startCarousel("desk");
});

modalContent.addEventListener("click", function(e) { 
    e.stopPropagation();
});

// Functions

function addHeader() {
    const headerNav = document.querySelector("#navbar-header");
    headerNav.innerHTML = `
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

function addFooter() {
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
        footer.scrollIntoView({
            behavior: "smooth"
        });    
    });
}

function createImages(container, imagesAmount, classType) {
    if (!container) return   

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

function setImages() {
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
    modalContainer.style.opacity = "1";
    closeButton.onclick = closeModal;
    modalContainer.onclick = closeModal;
}

function closeModal() {
    modalContainer.style.transform = "scale(0)";
    modalContainer.style.opacity = "0";
}

function setCarousel(classType) {
    //flex-carrusel father of this carousel element
    const carousel = document.querySelector(`.carrusel-${classType}`);

    if (!carousel) return

    const carouselItems = document.createElement('div');
    carouselItems.className = `carrusel-${classType}-items`;
    for (let i = 0; i < 7
        ; i++) {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carrusel-${classType}-item`;
        carouselItem.innerHTML = `
        <img src="images/${classType}/${i}.jpg">`;
        carouselItems.appendChild(carouselItem);
    }
    carousel.appendChild(carouselItems);
}

function startCarousel(classType) {
    const carouselItems = document.querySelector(`.carrusel-${classType}-items`);
    let carouselFocusedItem;
    let position = 0;
    const observer = new IntersectionObserver(elementObserver, {
        rootMargin: "200px"
    });

    setInterval (function () { 
        carouselFocusedItem = document.querySelector(`.carrusel-${classType}-items div`);
        carouselItems.style.left = `-${position}%`;
        position++;
        carouselItems.style.transition = 'all ease 1s';

        observer.observe(carouselFocusedItem);
    }, 100);
    
    
    function elementObserver(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) {
                carouselItems.appendChild(entry.target);
                carouselItems.style.left = "0.2%";
                carouselItems.style.transition = 'none';
                position = 0;
                observer.unobserve(entry.target);
            }
        })
    }
};
