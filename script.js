const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

photosArray = []

// UNSPLASH API
const count = 10;
const apiKey = 'RYGhjKy6b5posiWouhlm2csw29-figchTMRmo5F8GQE';
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

getPhotos();