import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './styles.css';
import ImagesApi from './api/apiService';
import LoadMore from './load-more';
import galleryTemplate from './templates/gallery.hbs';
import * as basicLightbox from 'basiclightbox';
import PNotify from '../node_modules/pnotify/dist/es/PNotify';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

const images = new ImagesApi(refs.searchForm);
const loadMore = new LoadMore();

refs.searchForm.addEventListener('submit', onSearch);
loadMore.button.addEventListener('click', loadMoreImg);
refs.gallery.addEventListener('click', openOriginalSize);

function onSearch(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  images.resetPage();

  images.getFormData();
  createMarkup();
}
function loadMoreImg() {
  images.incrementPage();
  createMarkup();
}

function createMarkup() {
  loadMore.inProgress();
  images
    .fetchImage()
    .then(img => {
      refs.gallery.insertAdjacentHTML('beforeend', galleryTemplate(img.hits));
      if (!img.totalHits) throw new Error('Not found');
      return img.totalHits <= images.page * 12;
    })
    .then(res => {
      if (res) {
        loadMore.hideButton();
        loadMore.hideSpinner();
      } else {
        loadMore.loaded();
      }
    })
    .then(() => scrollToNewContent(images.page))
    .catch(error => {
      PNotify.error({
        title: 'Oh No!',
        text: `${error.message}`,
      });
      loadMore.hideSpinner();
    });
}
function openOriginalSize(e) {
  if (e.target.nodeName !== 'IMG') return;
  const instance = basicLightbox.create(
    `<img src='${e.target.dataset.original}' alt ='${images.query}' width='600'>`,
  );

  instance.show();
}
function scrollToNewContent(page) {
  window.scrollTo({
    top:
      (refs.gallery.clientHeight / page) * (page - 1) +
      refs.searchForm.clientHeight,
    behavior: 'smooth',
  });
}
