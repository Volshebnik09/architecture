import {Swiper, Navigation} from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';

export default() => {
    const swiper = new Swiper('.index__stages__swiper', {
        slidesPerView: 'auto',
        spaceBetween: 70,
        centeredSlides: true,
        centeredSlidesBounds:true,
        speed:700,
        modules: [Navigation],
    });

    swiper.on('click',(e)=>{
        if (e.clickedIndex === undefined) return
        swiper.slideTo(e.clickedIndex)

        for (var i = 0; i < e.wrapperEl.children.length; i++) {
            e.wrapperEl.children[i].classList.remove('active');
        }
        let contents = document.querySelectorAll('.index__stages__swiper-content');

        for (var i = 0; i < contents.length; i++) {
            contents[i].classList.remove('active');
        }
        e.wrapperEl.children[e.clickedIndex].classList.add('active')
        contents[e.clickedIndex].classList.add('active');
    })
}