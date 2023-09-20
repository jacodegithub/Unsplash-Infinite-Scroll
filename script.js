const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

photosArray = []

let count = 10;
let ready = false
let imagesLoaded = 0
let totalImages = 0;

// UNSPLASH API

const apiKey = '7ojCppBCgznbtEJWZli2GAbub2yCDVBoLuJ0HeXswt0';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


// FETCH PHOTOES FROM UNSPLASH API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos();
    } catch(error) {
        console.log(error)
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    loader.hidden = false
    // console.log('display')
    photosArray.forEach(photo => {
        // CREATE ANCHOR TAG
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        // CREATE IMG TAG FOR PHOTOS
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // EVENT LISTENER, CHECK WHEN IMAGE IS FINISHED LOADING
        img.addEventListener('load', imageLoaded)

        // PUT IMG TAG INSIDE ANCHOR TAG, THEN PUT BOTH INSIDE IMAGE CONTAINER ELEMENT
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function imageLoaded() {
    imagesLoaded++;
    // console.log('image loaded')
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;  
    }
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
        ready = false;
        // console.log('load more')
    } 
})


getPhotos();