export class UnsplashAPI {
  #BASE_URL = 'https://api.unsplash.com/';
  #API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
  #query = '';

  getPopularPhotos(page) {
    const url = `${
      this.#BASE_URL
    }search/photos?page=${page}&query=office&client_id=${
      this.#API_KEY
    }&per_page=21`;
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }

  getFotosByQuery(page) {
    const url = `${this.#BASE_URL}search/photos?page=${page}&query=${
      this.#query
    }&client_id=${this.#API_KEY}&per_page=21`;
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}
