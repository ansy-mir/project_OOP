export default class Accordion {
  constructor (triggersSelector) {
    this.btns = document.querySelectorAll(triggersSelector);
  }
  
  init() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        console.log('CLICK');
        const sibling = btn.closest('.module__info-show').nextElementSibling;
        sibling.classList.toggle('msg');
        sibling.style.marginTop = '20px';
      });
    });
  }
  


}