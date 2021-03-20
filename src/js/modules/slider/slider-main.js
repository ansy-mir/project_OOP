import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(btns, next, prev) {
        super(btns, next, prev);
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

    bindTriggers(switchBtn, index) {
         switchBtn.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(index);
            });

            if (item.parentNode.previousElementSibling !== null) {
              item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
            }
        });       
    }

    render() {
        if (this.container) {
            this.showSlides(this.slideIndex);
            this.bindTriggers(this.btns, 1);
            this.bindTriggers(this.prev, -1);
            this.bindTriggers(this.next, 1);
        }
    }
}