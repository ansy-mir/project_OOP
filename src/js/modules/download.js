export default class Download {
  constructor (triggersSelector) {
    this.btns = document.querySelectorAll(triggersSelector);
    //Если файлы для скачивания имеют разные пути, то можно использовать конструкцию switch/case
    this.path = 'assets/img/mainbg.jpg';
  }

  downloadItem(path) {
    //Создаем ссылку для скачивания
    const link = document.createElement('a');
    //Устанавливаем атрибуты ссылке и путь
    link.setAttribute('href', path);
    //Устанавливаем тип закачивания и даем название
    link.setAttribute('download', 'nice_picture');

    //Т.к. элемент для внутреннего использования, пользователь не должен его видеть
    link.style.display = 'none';
    document.body.appendChild(link);

    //Вызываем событие на странице
    link.click();
    //Ссылка отработала - мы удаляем её со страницы
    document.body.removeChild(link);

  }

  init() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.downloadItem(this.path);
      });
    });
  }
}