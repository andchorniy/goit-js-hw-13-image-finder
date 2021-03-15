import '../node_modules/basiclightbox/dist/basicLightbox.min.css'
import './styles.css';
import ImagesApi from './api/apiService'
import galleryTemplate from './templates/gallery.hbs'
import * as basicLightbox from 'basiclightbox'

const refs = {
    input: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}

const images = new ImagesApi(refs.input)

refs.input.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', loadMore)
refs.gallery.addEventListener('click', openOriginalSize)

function onSearch(e) {
    e.preventDefault()
    refs.gallery.innerHTML = ''
    images.resetPage()
    createMarkup()
    refs.loadMoreBtn.classList.remove('is-hidden')
}
function loadMore() {
    images.incrementPage()
    createMarkup()
}

function createMarkup() {
    images.getFormData()
    images.fetchImage()
        .then(img => refs.gallery.insertAdjacentHTML('beforeend', galleryTemplate(img.hits)))
     
}
function openOriginalSize(e) {
    
    const instance = basicLightbox.create(`<img src='${e.target.dataset.original}' alt ='${images.query}' width='600'>`)
    
    instance.show()
    
}

