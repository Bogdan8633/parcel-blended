export class UnsplashAPI {
    #BASE_URL = "https://api.unsplash.com/";
    #API_KEY = "LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc";

    getPopularPhotos(page) {
        const url = `${this.#BASE_URL}search/photos?page=${page}&query=office&client_id=${this.#API_KEY}&per_page=21`;
        return fetch(url).then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
    
    } 

}