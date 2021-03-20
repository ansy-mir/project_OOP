import Slider from './slider';

export default class MiniSlider extends Slider {
  constructor(container, next, prev, autoplay, animate, activeClass) {
    super(container, next, prev, autoplay, animate, activeClass);
  }

  decorizeSlides() {
    this.slides.forEach(slide => {
      slide.classList.remove(this.activeClass);
        if(this.animate) {
          slide.querySelector('.card__title').style.opacity = '0.4';
          slide.querySelector('.card__controls-arrow').style.opacity = '0';
        }
    });
    this.slides[0].classList.add(this.activeClass);
    
    if(this.animate) {      
      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    }
  }

  nextSlide() {
    for (let i = 1; i < this.slides.length - 1; i += 1){
      if(this.slides[i].tagName !== "BUTTON") {
        this.container.appendChild(this.slides[0]);
        this.decorizeSlides();
        break;
      } else {
        this.container.appendChild(this.slides[i]);
        i -= 1;
      }
    }
  }

  autoplayStart() {
    let autoplay = setInterval(() => this.nextSlide(), 5000);

    this.slides[0].parentNode.addEventListener('mouseenter', () => {
      clearInterval(autoplay);
    });
    this.slides[0].parentNode.addEventListener('mouseenter', () => {
      clearInterval(autoplay);
    });
    this.slides[0].parentNode.addEventListener('mouseenter', () => {
      clearInterval(autoplay);    
    });
  }

  bindTiggers() {
    this.next[0].addEventListener('click', () => {
      this.nextSlide();      
    });

    this.prev[0].addEventListener('click', () => {
      for (let i = this.slides.length - 1; i > 0; i -= 1){
        if(this.slides[i].tagName !== "BUTTON") {
          let active = this.slides[i];
          this.container.insertBefore(active, this.slides[0]);
          this.decorizeSlides();
          break;
        }
      }      
    });
  }

  init() {
    try {
      this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-items: flex-start;
    `;

    this.bindTiggers();
    this.decorizeSlides();

    if(this.autoplay) {
      this.autoplayStart();
      
      this.slides[0].parentNode.addEventListener('mousleave', () => {
        this.autoplayStart();
      });
      this.slides[0].parentNode.addEventListener('mousleave', () => {
        this.autoplayStart();
      });
      this.slides[0].parentNode.addEventListener('mousleave', () => {
        this.autoplayStart();
      });
    }

    } catch(e) {}


  }
}
