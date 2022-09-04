const burgerBtn = document.querySelector('.header__burger-btn')
const popup = document.querySelector('.header__popup__nav')

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('open')
    popup.classList.toggle('open')
})

