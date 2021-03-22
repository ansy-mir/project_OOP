export default class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll('input');
    this.message = {
      loading: 'Идет отправка..',
      success: 'Отправлено!',
      failure: 'Ошибка..',
    };
    this.path = 'assets/question.php';
  }

  clearInputs() {
    this.inputs.forEach(input => {
      input.value = '';
    });
  }

  async postData (url, data) {
    let result = await fetch(url, {
      method: "POST",
      body: data
    });
    return await result.text();
  }

  checkTextInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');
  
    mailInputs.forEach(input => {
      input.addEventListener('keypress', function(e) {
        if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
          e.preventDefault();
        }
      });
    });
  }

  initMask() {
    let setCursorPosition = (pos, elem) => {
      elem.focus();
  
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
          let range = elem.createTextRange();
  
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
      }
    };
  
    function createMask(event) {
      let matrix = '+1 (___) ___-____',
          i = 0,
          def = matrix.replace(/\D/g, ''),
          val = this.value.replace(/\D/g, '');
  
      if(def.length >= val.length) {
        val = def;
      }
      console.log(val);
  
      //this.value - то, что ввёл пользователь. /./g - проходим по каждому символу из матрицы (a) и применяем к нему функцию
      this.value = matrix.replace(/./g, function(a) {
        //и если символ в матрице === числу или ___, то записывает туда введенные пользователем данные из val (обрезанного this.value)
        //иначе возвращает символ как есть (a) или обрезает строку (''), если символов больше, чем 
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });
      console.log(this.value);
  
      if (event.type === 'blur') {
        if (this.value.length === 2) {
          this.value = '';
        } else {
          console.log('Hello')
          setCursorPosition(this.value.length, this);
        }
      }
    }
  
    let inputs = document.querySelectorAll('[name="phone"]');
  
    inputs.forEach(input => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }

  init() {
    this.initMask();
    this.checkTextInputs();
    this.forms.forEach(item => {
      item.addEventListener('submit', (e) => {
         
        e.preventDefault();
  
        let statusMessage = document.createElement('div');
        statusMessage.style.cssText = `
          margin-top: 15px;
          font-size: 18px;
          color: grey;
        `;
        item.parentNode.appendChild(statusMessage);
        statusMessage.textContent = this.message.loading;

        const formData = new FormData(item);
        this.postData(this.path, formData)
          .then(result => {
          console.log(result);
          statusMessage.textContent = this.message.success;

          }).catch((e) => {
          console.log(e);
          statusMessage.textContent = this.message.failure;

          }).finally(() => {
          this.clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          //   item.style.display = 'block';
          //   item.classList.remove('fadeOutUp', 'animated');
          //   item.classList.add('fadeInUp');
          }, 6000);
        });
      });
  });
}
}



// import {postData} from '../servises/requests';

// const forms = (state) => {
//   const allForms = document.querySelectorAll('form'),
//         inputs = document.querySelectorAll('input'),
//         upload = document.querySelectorAll('[name="upload"]');

//   // checkNumInputs('input[name="user_phone"]');

//   const message = {
//     loading: 'Идет отправка..',
//     success: 'Отправлено!',
//     failure: 'Ошибка..',
//     spinner: 'assets/img/spinner.gif',
//     ok: 'assets/img/ok.png',
//     fail: 'assets/img/fail.png'
//   };

//   allForms.forEach(item => {
//     item.addEventListener('submit', (e) => {
       
//       e.preventDefault();

//       let statusMessage = document.createElement('div');
//       statusMessage.classList.add('status');
//       item.parentNode.appendChild(statusMessage);

//       //Красиво скрыть форму, чтобы на её месте появилось окно оповещения. 
//       //Сначала делаем её прозрачной, потом через 4 мс убираем вообще
//       item.classList.add('animated', 'fadeOutUp');
//       setTimeout(() => {
//         item.style.display = 'none';
//       }, 400);

//       let statusImg = document.createElement('img');
//       statusImg.setAttribute('src', message.spinner);
//       statusImg.classList.add('animated', 'fadeInUp');
//       statusMessage.appendChild(statusImg);

//       let textMessage = document.createElement('div');
//       textMessage.textContent = message.loading;
//       statusMessage.appendChild(textMessage);

//       const formData = new FormData(item);
//       if (item.getAttribute('data-calc') === 'end') {
//          formData.append('totalPrice', document.querySelector('.calc-price').textContent);
//       }
//       console.log(JSON.stringify(state))
           
//       postData('assets/question.php', formData)
//         .then(result => {
//           console.log(result);
//           statusImg.setAttribute('src', message.ok);
//           textMessage.textContent = message.success;

//       }).catch((e) => {
//           console.log(e);
//           statusImg.setAttribute('src', message.fail);
//           textMessage.textContent = message.failure;

//       }).finally(() => {
//           clearInputs();
//           setTimeout(() => {
//             statusMessage.remove();
//             item.style.display = 'block';
//             item.classList.remove('fadeOutUp', 'animated');
//             item.classList.add('fadeInUp');
//           }, 4000);

          //Закрываем окно после ввода всех данных
          // if (item.getAttribute('data-calc') === 'end') {
          //   setTimeout(() => {
          //     item.closest('.popup_calc_end').style.display = 'none';
          //     document.body.style.overflow = "scroll";
          //   }, 6000);            
          // }
//         });
//     });
//   });
// };