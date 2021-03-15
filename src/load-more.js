export default class LoadMore {
    constructor() {
        this.button = document.querySelector('.load-more');
        this.spinner = document.querySelector('.spinner-border');
        this.loaded = this.loaded.bind(this)
    }
    inProgress() {
        this.spinner.classList.remove('is-hidden')
        this.button.classList.add('is-hidden')
    }
    
    loaded() {
        this.spinner.classList.add('is-hidden')
        this.button.classList.remove('is-hidden')
    }
    hideSpinner() {
        this.spinner.classList.add('is-hidden')
    }
    
}