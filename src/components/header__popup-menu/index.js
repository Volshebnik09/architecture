module.exports = function(el = '.header__popup-menu'){
    let popup = document.querySelector(el);
    let content = popup.querySelector('.header__popup-menu__content');
    let exit = popup.querySelector('.header__popup-menu__close svg');
    let open = document.querySelector('.header__popup-button svg')
    let body = document.body;
    content.addEventListener('click',(e)=>{
        e.stopPropagation();
    })
    exit.addEventListener('click', (e)=>{
        e.stopPropagation()
        popup.removeAttribute('active')
        body.style.overflow = 'auto'
    })
    open.addEventListener('click', (e)=>{
        e.stopPropagation();
        popup.setAttribute('active','')
        body.style.overflow = 'hidden'
    })
    popup.addEventListener('click',(e)=>{
        popup.removeAttribute('active')
        body.style.overflow = 'auto'
    })

    let links = popup.querySelectorAll('#checkForClick')
    links.forEach((link)=>{

        link.addEventListener('click',(e)=>{
            let newNav = link.querySelector('.header__popup-menu__subli');
            let haveAttribute = newNav.hasAttribute('active');
            links.forEach((link)=>{
                link.querySelector('.header__popup-menu__subli').removeAttribute('active')
            })
            haveAttribute?
                newNav.removeAttribute('active','')
                :newNav.setAttribute('active','')
        })
    })
}