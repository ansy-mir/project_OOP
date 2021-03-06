import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import VideoPlayer from './modules/playVideo';
import Difference from './modules/difference';
import Form from './modules/form';
import Accordion from './modules/accordion';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {
  const indexSlider = new MainSlider({btns: '.next', container: '.page'});
  indexSlider.render();

  const modulePageSlide = new MainSlider({
    btns: '.next', 
    container: '.moduleapp', 
    next: '.nextmodule', 
    prev: '.prevmodule'
  });
  modulePageSlide.render();

  const showUpSlider = new MiniSlider({
    container: '.showup__content-slider', 
    next: '.showup__next', 
    prev: '.showup__prev',
    activeClass: 'card-active',
    animate: true
  });
  showUpSlider.init();

  const modulesSlider = new MiniSlider({
    container: '.modules__content-slider', 
    next: '.modules__info-btns .slick-next', 
    prev: '.modules__info-btns .slick-prev',
    activeClass: 'card-active',
    animate: true,
    autoplay: true
  });
  modulesSlider.init();

  const feedSlider = new MiniSlider({
    container: '.feed__slider', 
    next: '.feed__slider .slick-next', 
    prev: '.feed__slider .slick-prev',
    activeClass: 'feed__item-active'
  });
  feedSlider.init();

  new VideoPlayer('.showup .play', '.overlay').init();
  new VideoPlayer('.video .play', '.overlay').init();

  new VideoPlayer('.module__video-item .play', '.overlay').init();

  new Difference('.officerold', '.officernew', '.officer__card-item').init();
  
  new Form('.form').init();

  new Accordion('.plus__content').init();

  new Download('.download').init();

});
