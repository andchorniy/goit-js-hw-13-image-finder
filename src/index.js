import '../node_modules/basiclightbox/dist/basicLightbox.min.css'
import './styles.css';
import ImagesApi from './api/apiService'
import LoadMore from './load-more'
import galleryTemplate from './templates/gallery.hbs'
import * as basicLightbox from 'basiclightbox'
import PNotify from '../node_modules/pnotify/dist/es/PNotify';


PNotify.error({
  title: 'Oh No!',
  text: 'Something terrible happened.'
});

const refs = {
    input: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    
}

const images = new ImagesApi(refs.input)
const loadMore = new LoadMore()


refs.input.addEventListener('submit', onSearch)
loadMore.button.addEventListener('click', loadMoreImg)
refs.gallery.addEventListener('click', openOriginalSize)

function onSearch(e) {
    e.preventDefault()
    refs.gallery.innerHTML = ''
    images.resetPage()
    createMarkup()
    
}
function loadMoreImg() {
    images.incrementPage()
    createMarkup()
}

function createMarkup() {
    images.getFormData()
    loadMore.inProgress()
    images.fetchImage()
        .then(img => refs.gallery.insertAdjacentHTML('beforeend', galleryTemplate(img.hits)))
        .then(loadMore.loaded)
        .then(() => scrollToNewContent(images.page))
     
}
function openOriginalSize(e) {
    if (e.target.nodeName !== "IMG") return
    const instance = basicLightbox
        .create(`<img src='${e.target.dataset.original}' alt ='${images.query}' width='600'>`)
    
    instance.show()   
}
function scrollToNewContent(page) {
    window.scrollTo({
    top: 1360 * (page - 1) + 87,
    behavior: 'smooth'
    });
}
