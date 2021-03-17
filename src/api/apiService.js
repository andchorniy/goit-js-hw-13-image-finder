const BASE_URL = 'https://pixabay.com/api/';
const KEY = '20675332-a9702851f51ed62280a08ad8f';

export default class ImagesApi {
  constructor(selector) {
    this.page = 1;
    this.query = '';
    this.selector = selector;
  }
  async fetchImage() {
    if (this.query.trim()) {
      const response = await fetch(
        `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${KEY}`,
      );
      const result = await response.json();
      return result;
    } else {
      throw new Error('Incorrect request');
    }
  }
  getFormData() {
    this.query = this.selector.query.value;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
