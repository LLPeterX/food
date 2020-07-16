'use strict';

window.addEventListener('DOMContentLoaded', () => {

  const menuItems = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    menuContainer = document.querySelector(".tabheader__items");


  function hideTabContent() {
    // скрываем содержимое 
    tabContent.forEach(item => item.classList.add("hide"));
    // удаляем класс активного пункта vменю (жирный шрифт)
    menuItems.forEach(item => {
      item.classList.remove("tabheader__item_active");
      item.classList.remove("fade");
    }
    );
  }

  // функция показать i-й div контента
  function showTabContent(i = 0) { //default i=0
    tabContent[i].classList.replace('hide', 'show');
    menuItems[i].classList.add("tabheader__item_active");
    tabContent[i].classList.add("fade");
    menuItems[i].classList.add("fade");
  }

  menuContainer.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      menuItems.forEach((item, i) => {
        if (item === target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  hideTabContent();
  showTabContent();
  // -------------------- 41 добаляем таймер акции -----------------------
  const deadline = '2020-08-01 00:00'; // изменить время!

  function getRemainingTime(endtime) {
    const t = Date.parse(endtime) - (new Date()); // разница в ms
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / (1000 * 60)) % 60);
    const seconds = Math.floor((t / 1000) % 60);
    return ({
      total: t, days, hours, minutes, seconds
    });
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const daysElement = timer.querySelector('#days'),
      hoursElement = timer.querySelector('#hours'),
      minElement = timer.querySelector('#minutes'),
      secElement = timer.querySelector('#seconds'),
      actionsTimer = setInterval(updateClock, 1000);

    updateClock(); // чтобы избежать показа старых значение элементов

    function updateClock() {
      const t = getRemainingTime(endtime);

      if (t.total <= 0) {
        // скрываем div с промо-акцией
        document.querySelector('.promotion').style.display = "none";
        clearInterval(actionsTimer);
      }

      daysElement.textContent = leadingZero(t.days, false);
      hoursElement.textContent = leadingZero(t.hours, true);
      minElement.textContent = leadingZero(t.minutes, true);
      secElement.textContent = leadingZero(t.seconds, true);
    }

    function leadingZero(value, isNeedZero) {
      if (value < 10 && isNeedZero) {
        return "0" + value;
      } else {
        return value;
      }
    }

    function replacePromoText(selector, dateStr) {
      let months = ["января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"];
      const el = document.querySelector(selector);
      let [ymd, timeStr] = dateStr.split(' ');
      let [year, month, day] = ymd.split("-");
      let newStr = day.substring(0, 2) + " " + months[+month - 1] + " " + year + " " + (timeStr || "");
      el.innerHTML = el.innerHTML.replace('Акция закончится 1 августа в 00:00', 'Акция закончится ' + newStr);
    }

    replacePromoText('.promotion__descr', deadline);
  }

  setClock(".timer", deadline);

  // Modal window

  const modalTriggers = document.querySelectorAll('[data-modal]'),
    modalWindow = document.querySelector('.modal');
    
  // функции скрытия и показа модального  окна
  function closeModalWindow() {
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    document.body.style.overflow = '';
  }
  function showModalWindow() {
    modalWindow.classList.remove('hide');
    modalWindow.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  // вешаем обработчик собыйтий открытия окна
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', showModalWindow);
  });

  // если кликнули за пределами окна (т.е. попали в div class=modal)
  // или нажали ESC, или элемент содержит атрибут "data-close", то закрыть окно
  modalWindow.addEventListener('click', (event) => {
    if (event.target === modalWindow || event.target.getAttribute('data-close')=='') {
      closeModalWindow();
    }
  });
  // обработка ESC
  document.addEventListener('keydown', (event) => {
    if (event.code === "Escape" && modalWindow.classList.contains('show')) {
      closeModalWindow();
    }
  });

  // модальное окно должно появиться через 1 мин.
  // --- закомментировано, чтобы не мешало
  //const modalTimerId = setTimeout(showModalWindow, 60000);

  // Показать окно при прокрутке до конца всего сайта
  function showModalWindowOnScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModalWindow();
      window.removeEventListener('scroll', showModalWindowOnScroll);
    }
  }
  window.addEventListener('scroll', showModalWindowOnScroll);

  // ------------- карточки продуктов ----------------------

  const getResource = async (url) => {
    const res =  await fetch(url);
    if(!res.ok) {
      throw new Error(`"Ошибка! Сервер ${url} сообщает ${res.status}: ${res.statusText}`);
    }
    return res.json();
  };

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price; // в USD
      this.classes = classes; // array or undefined
      this.parent = document.querySelector(parentSelector);
      this.currencyRate = 72.171;
      this.changeToRUR(); // преобразуем цену USD в RUR
    }
    // метод конвертации валюты в рубли. price в долларах
    changeToRUR() {
      this.price = Math.round(this.price * this.currencyRate, 2);
    }
    // отображение карточки продукта
    render() {
      let html = `
      <div class="menu__item">
      <img src=${this.src} alt=${this.alt}>
    <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
    <div class="menu__item-descr">${this.descr}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> руб.</div>
    </div></div>`;
      const el = document.createElement("div");
      if (this.classes.length === 0) {
        this.classes = ['menu__item'];
      }
      this.classes.forEach(className => el.classList.add(className));
      el.innerHTML = html;
      this.parent.append(el);
    }
  }
  // jshint ignore: start
  const selector = ".menu__field .container";

  // new MenuCard("img/tabs/vegy.jpg", "vegy", "Фитнес",
  //   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //   3.5, selector, "menu__item").render();
  // new MenuCard("img/tabs/elite.jpg", "elite", "Премиум",
  //   'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  //   4.2, selector, "menu__item").render();
  // new MenuCard("img/tabs/post.jpg", "post", "Постное",
  //   'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  //   1.0, selector).render();
// jshint ignore: end

  // getResource('http://localhost:3000/menu')
  // .then(data => {
  //   data.forEach( ( {img,altimg,title,descr,price} ) => 
  //     new MenuCard(img,altimg,title,descr,price, selector).render() //jshint ignore:line
  //   );
  // });


  // console.log('alternative2');
  // function createCard(data) { // data - массив объектов меню
  //   data.forEach(({img,altimg,title,descr,price})=>{
  //     const el = document.createElement('div');
  //     el.classList.add("menu__item");
  //     el.innerHTML=`<img src=${img} alt=${altimg}>
  //     <h3 class="menu__item-subtitle">Меню "${title}"</h3>
  //     <div class="menu__item-descr">${descr}</div>
  //     <div class="menu__item-divider"></div>
  //     <div class="menu__item-price">
  //         <div class="menu__item-cost">Цена:</div>
  //         <div class="menu__item-total"><span>${price}</span> руб.</div>
  //     </div>`;
  //     document.querySelector(".menu .container").append(el);
  //     //document.querySelector(selector).append(el);
  //   });
  // }

  // getResource('http://localhost:3000/menu')
  //  .then(data => createCard(data));
  
// --------------- 4.60 axios ---------------------------------
//axios.get('http://localhost:3000/menu').then(data => console.log(data.data));
axios.get('http://localhost:3000/menu')
.then(data => {
    data.data.forEach( ( {img,altimg,title,descr,price} ) => 
      new MenuCard(img,altimg,title,descr,price, selector).render() //jshint ignore:line
    );
  });

// --------------- 4.53, 59. Передача данных форм обратной связи на сервер -------------
  const forms = document.querySelectorAll('form');
  // массив, в котором данные  ходе выполнени запроса:
  let message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Мы с вами свяжемся.",
    failure: "Извините, произошла ошибка"
  };

  forms.forEach(item => {
    bindPostData(item);
  });

  // функция отправки фопрмы обратной сваязи на сервер.
  // @param url - URL запроса
  // @param data - данные формы
  const postData = async (url,data) => {
    const res =  await fetch(url,{
       method: 'POST',
       headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: data});
      return await res.json(); // ответ - promise!
  };

  // функция обработки и отправки данных формы обратной связи
  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // div для сообщения о результате в нижней части формы
      const statusMessage = document.createElement('div');
      statusMessage.src=message.loading;
      statusMessage.style.cssText = "display: 'block'; margin: 0 auto;";
      setTimeout(() => statusMessage.remove(),5000);
      form.insertAdjacentElement('afterend',statusMessage); // всё равно не работает
    
      const formData = new FormData(form);
      const json =  JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests',json)
      .then(response => {
          console.log('SERVER RESP:',response);
          showThanksModal(message.success); // Окно "спасибо", закроется через 4 сек.
          statusMessage.remove(); // удаляем спиннер со статусом под формой
      })
      .catch(()=> {
        showThanksModal(message.failure);
      })
      .finally(()=> {
        form.reset();
      });

    }); // event listener
  } // bindPostData()

  // ---------------- 54. Оповещение пользователя -----------

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    // скрываем предыдущий контент
    prevModalDialog.classList.remove('show');
    prevModalDialog.classList.add('hide');
    showModalWindow();
    // вручную создаем новый div
    const thanksModal = document.createElement('div');
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
    <div class="modal__content">
      <div data-close class="modal__close">&times;</div>
      <div class="modal__title">${message}</div>
    </div>
    `;
    const parent = document.querySelector('.modal');
    parent.append(thanksModal);
    setTimeout(()=>{
      thanksModal.remove();
      prevModalDialog.classList.remove('hide');
      prevModalDialog.classList.add('show');
      closeModalWindow();
    },4000);
  } // end thanksModal

  // --------------- 4.61 Slider ---
  const slides = document.querySelectorAll(".offer__slide"),
        prevButton = document.querySelector(".offer__slider-prev"),
        nextButton = document.querySelector(".offer__slider-next"),
        countPlaceholder = document.querySelector('#current'),
        totalPlaceholder = document.querySelector('#total');
  const slidesCount = slides.length;
  let slideIndex=1; // текущий слайд
  totalPlaceholder.innerHTML = (slidesCount<10) ? "0"+slidesCount : slidesCount.toString();
  
  function showSlide(n) {
    if(n<1) {
      slideIndex=slidesCount;
    }
    if(n>slidesCount) {
      slideIndex=1;
    }
    countPlaceholder.innerHTML= (slideIndex<10) ? "0"+slideIndex.toString() : slideIndex.toString();
    // apply "hide" to all slides except current
    //slides.forEach(el => el.classList.add('hide'));
    slides.forEach(el => el.style.display='none');
    // remove 'hide' to 
    //slides[slideIndex-1].classList.remove('hide');
    slides[slideIndex-1].style.display='block';
    
  }

  prevButton.addEventListener('click',()=> {
    showSlide(--slideIndex);
  });
  nextButton.addEventListener('click',()=> {
    showSlide(++slideIndex);
  });
  showSlide(slideIndex); // начальный показ 1-го слайда


}); // end 'DOMContentLoaded'




