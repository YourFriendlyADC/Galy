const modalContainer = document.querySelector(".modal-container");
const modalContent = document.querySelector(".modal-content");
const footer = document.querySelector("#footer");
const toPhone = document.querySelector(".to-phone");
const toDesk = document.querySelector(".to-desk");

document.addEventListener("DOMContentLoaded", function() {
    addHeader();
    setImages();    
    addFooter();
    scrollIntoFooter();
    setCarousel("phone");
    setCarousel("desk");
});

if (location.href == 'index.html') {
    toPhone.addEventListener("click", function() {
        location.href = 'phone.html';
    });
    
    toDesk.addEventListener("click", function() {
        location.href = 'desk.html';
    });
}

if (location.href == 'phone.html' || location.href == 'desk.html') {
    modalContent.addEventListener("click", function(e) { 
        e.stopPropagation();
    });
}


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
                </div>                                                    
            </div>
            <!-- <div class="send-wallpapers">
                <a href="send.html" target="_blank"> Do you want to share your wallpapers? </a>
            </div> -->
            <div class="about-galy">
                <h3 class="title"> About Galy </h3>
                <p class=""description> With Galy you can look for wallpapers and download it in an easy way. All of these wallpapers were created by Leonardo AI and they aren't used for commercial purposes, such as this website. I hope you found anyone you like and just download it! </p>                
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
                <img class="card ${classType}" src="./images/${classType}/${i}.png" title="image" loading="lazy">
            </label> `;
        imageContainer.onclick = function() {
            showModal(`images/${classType}/${i}.png`, classType);
        }        
        container.appendChild(imageContainer);        
    }
}

function setImages() {
    const phoneImages = document.querySelector(".phone-images");
    const deskImages = document.querySelector(".desk-images");
    createImages(deskImages, 15, "desk");
    createImages(phoneImages, 25, "phone");
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
    const track = document.querySelector(`.slide-track-${classType}`);
    if (!track) return  
    for (let i = 0; i < 18; i++) {
        track.innerHTML += `
        <div class="${classType}-slide"></div>
        `;        
    }
}

// Share Wallpapers
const dragAndDropContainer = document.querySelector('.drag-and-drop-container');
const dragAndDrop = document.querySelector('.drag-and-drop');
const dropButton = document.querySelector('.archives');
const dropInput = document.querySelector('#input-file');
let files;

dropButton.addEventListener("click", (e) => {
    dropInput.click();    
});

dropInput.addEventListener("change", (e => {
    files = this.files;
    dragAndDropContainer.classList.add("active");
    showFile(files);
    dragAndDropContainer.classList.remove("active");
}));

dragAndDropContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    dragAndDropContainer.classList.add("active");
    // dragAndDrop.textContent = "Suelta";
});

dragAndDropContainer.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dragAndDropContainer.classList.remove("active");
    // dragAndDrop.textContent = "Arrastra archivos";
});

dragAndDropContainer.addEventListener("drop", (e) => {
    e.preventDefault();
    files = e.dataTransfer.files;
    showFile(files);
    dragAndDropContainer.classList.remove("active");
    // dragAndDrop.textContent = "Arrastra archivos";
});

function showFile(files) {
    if (files.lenght == undefined) {
        processFile(files);
    } else {
        for (const file of files) {
            processFile(file);
        }
    }
}

function processFile(file) {
    const docType = file.type;
    const validExtensions = ['png', 'image/jpg', 'image/jpeg'];
    console.log(docType);
    
    if (validExtensions.includes(docType)) {
        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`;

        fileReader.addEventListener("load", (e) => {
            const fileUrl = fileReader.result;
            const image = `
                <div id="${id}" class="file-container">
                    <img src="${fileUrl}" alt="${file.name}" width="50px">
                    <div class="status">
                        <span>${file.name}</span>
                        <span class="status-text">
                            Loading...
                        </span>
                    </div>
                </div>`;

            const html = document.querySelector('#preview').innerHTML;
            document.querySelector('#preview').innerHTML = image + html;
        });
        fileReader.readAsDataURL(file);
        uploadFile(file, id);
    } else { //Arreglar esto
        alert("Archivo no válido");
    }
}

function uploadFile() {

}