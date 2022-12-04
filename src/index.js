import { UnsplashAPI } from './js/UnsplashAPI';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { createGalleryCards } from './js/galleryCard';
import { refs } from './js/refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  totalItems: 10,
  itemsPerPage: 21,
  visiblePages: 10,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-custom">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination('pagination', options);

const page = pagination.getCurrentPage();
const unsplashApi = new UnsplashAPI();

unsplashApi
  .getPopularPhotos(page)
  .then(data => {
    pagination.reset(data.total);
    const markup = createGalleryCards(data.results);
    refs.galleryListEl.innerHTML = markup;
    refs.paginationsEl.classList.remove('is-hidden');
  })
  .catch(error => {
    Notify.failure('Щось пішло не так');
  });

function morePopularPhotos(event) {
  const currentPage = event.page;
  unsplashApi
    .getPopularPhotos(currentPage)
    .then(data => {
      const markup = createGalleryCards(data.results);
      refs.galleryListEl.innerHTML = markup;
    })
    .catch(error => {
      refs.paginationsEl.classList.add('is-hidden');
      Notify.failure('Щось пішло не так');
    });
}

pagination.on('afterMove', morePopularPhotos);

function onHandleSubmit(evt) {
  evt.preventDefault();
  const {
    elements: { query },
  } = evt.target;
  const searchValue = query.value.trim().toLowerCase();
  if (!searchValue) {
    Notify.failure('Заповніть рядок для пошуку');
    return;
  }
  unsplashApi.query = searchValue;
  pagination.off('afterMove', morePopularPhotos);
  pagination.off('afterMove', moreFotosByQuery);
  pagination.on('afterMove', moreFotosByQuery);
  unsplashApi
    .getFotosByQuery(page)
    .then(data => {
      if (data.results.length === 0) {
        Notify.info(`По вашому запиту ${searchValue} ми не знайшли нічого`);
        refs.paginationsEl.classList.add('is-hidden');
        refs.galleryListEl.innerHTML = '';
        return;
      }
      pagination.reset(data.total);
      const markup = createGalleryCards(data.results);
      refs.galleryListEl.innerHTML = markup;
      refs.paginationsEl.classList.remove('is-hidden');
    })
    .catch(error => {
      refs.paginationsEl.classList.add('is-hidden');
      Notify.failure('Щось пішло не так');
    });
}

function moreFotosByQuery(event) {
  const currentPage = event.page;
  unsplashApi
    .getFotosByQuery(currentPage)
    .then(data => {
      const markup = createGalleryCards(data.results);
      refs.galleryListEl.innerHTML = markup;
    })
    .catch(error => {
      refs.paginationsEl.classList.add('is-hidden');
      Notify.failure('Щось пішло не так');
    });
}

refs.formEl.addEventListener('submit', onHandleSubmit);
