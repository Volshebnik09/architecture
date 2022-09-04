import {Swiper, Navigation, Autoplay} from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';

export default() => {
    const swiper = new Swiper('.index__supports__swiper', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        centeredSlides: true,
        speed: 700,
        loop: true,

        autoplay: {
            delay: 1500,
            reverseDirection: true
        },
        navigation: {
            nextEl: '.news__news__swiper-button-next',
            prevEl: '.news__news__swiper-button-prev',
        },
        // breakpoints: {
        //     1000: {
        //         slidesPerView: 7,
        //         spaceBetween: 10,
        //         centeredSlides: true,
        //     },
        //     768:{
        //         slidesPerView: 5,
        //         spaceBetween: 10,
        //         centeredSlides: true,
        //     },
        //     480:{
        //         slidesPerView: 3,
        //         spaceBetween: 10,
        //         centeredSlides: true,
        //     },
        //     320:{
        //         slidesPerView: "auto",
        //         centeredSlides: true,
        //         speed: 1500,
        //         autoplay: {
        //             delay: 0,
        //             reverseDirection: true
        //         },
        //     }
        // },
        modules: [Navigation, Autoplay],
    });
}