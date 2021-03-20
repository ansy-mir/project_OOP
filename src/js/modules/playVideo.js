export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.buttons = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  bindTriggers() {
    this.buttons.forEach((btn, i) => {
      try {
        const blockedElem = btn.closest('.module__video-item').nextElementSibling;

        if (i % 2 === 0) {
          blockedElem.setAttribute('data-disabled', 'true');
        }
      } catch (e) {}

      btn.addEventListener('click', () => {
        if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
          this.activeBtn = btn;
          if(document.querySelector('iframe#frame')) {
            this.overlay.style.display = 'flex';
  
            if(this.path !== btn.getAttribute('data-url')) {
              this.path = btn.getAttribute('data-url');
              this.player.loadVideoById({videoId: this.path});
            }
          } else {
            this.path = btn.getAttribute('data-url');
  
            this.createPlayer(this.path);
          }
        }
      });
    });
  }

  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }

  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`,
      events: {
        //onStateChange будет выполнена при активации события
        'onStateChange': this.onPlayerStateChange
      }
    });
    this.overlay.style.display = 'flex';
  }

  onPlayerStateChange(state) {
    try {
          //найдем ближайший к нашему видео идентичный элемент
    const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
    //глубокое клонирование параметров кнопки от предыдущего видео
    const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);

    //Если свойства объекта state.data = 0 (воспроизведение видео завершено)
    if (state.data === 0) {
      //Если кнопка не активна
      if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
        //То разблокируем видео
        blockedElem.querySelector('.play__circle').classList.remove('closed');
        //Удалим значок замочка
        blockedElem.querySelector('svg').remove();
        //Назначим кнопке новые параметры
        blockedElem.querySelector('.play__circle').appendChild(playBtn);
        //Меняем текст рядом с кнопкой
        blockedElem.querySelector('.play__text').textContent = 'play video';
        //Удаляем ненужный класс с текста и меняем стили на видео
        blockedElem.querySelector('.play__text').classList.remove('attention');
        blockedElem.style.opacity = 1;
        blockedElem.style.filter = 'none';

        blockedElem.setAttribute('data-disabled', 'false');
      }      
    }

    } catch(e) {}

  }

  init() {
    //Check if there is at least one element in 'buttons'
    if(this.buttons.length > 0) {
      const tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      this.bindTriggers();
      this.bindCloseBtn();
    }
  }
}