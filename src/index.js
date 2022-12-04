

import { UnsplashAPI } from './js/UnsplashAPI';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const options = {
  totalItems: 10,
  itemsPerPage: 21,
  visiblePages: 10,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
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
      '</a>'
  }
};

const pagination = new Pagination('pagination', options);

const page = pagination.getCurrentPage();
console.log(page);
const unsplashApi = new UnsplashAPI();

unsplashApi.getPopularPhotos(page).then(data => {
  console.log(data);
  pagination.reset(data.total)
});

function morePopularPhotos(event) {
  const currentPage = event.page;
     unsplashApi.getPopularPhotos(currentPage).then(data => {
  console.log(data);
});
} 

pagination.on('afterMove', morePopularPhotos);



// https://api.unsplash.com/search/photos?page=1&query=office&client_id=LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc
