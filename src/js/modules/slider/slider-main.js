import Slider from './slider';

export default class MainSlider extends Slider {
  constructor(btns) {
    super(btns);
  }

  
  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    try {
      if (n === 3){
        this.showHanson('.hanson');
      }
    }
    catch(e){}

    this.slides.forEach(slide => {
      slide.style.display = 'none';
    });

    this.slides[this.slideIndex - 1].style.display = 'block';
  }
    
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
    console.log(this.slideIndex);
  }

  showHanson(selector) {
    const hanson = document.querySelector(selector);
    hanson.style.opacity = '0';
    hanson.classList.remove('slideInUp');
    setTimeout(function() {
      hanson.classList.add('animated', 'slideInUp');
      hanson.style.opacity = '1';
    }, 3000);    
  }

  render() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.plusSlides(1);
      });
      btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

  this.showSlides(this.slideIndex);
  }
}