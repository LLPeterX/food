'use strict';
window.addEventListener('DOMContentLoaded', () => {
  const tabs = require('./modules/tabs'),
        modal = require('./modules/modalWindow'),
        timer = require('./modules/deadline'),
        cards = require('./modules/cards'),
        forms = require('./modules/forms'),
        slider = require('./modules/slider'),
        calc = require('./modules/calc');
  
  tabs();
  modal();
  timer();
  cards();
  forms();
  slider();
  calc();
  // -------------------- 41 добаляем таймер акции -----------------------
  // const deadline = '2020-08-01 00:00'; // изменить время!

  // function getRemainingTime(endtime) {
  //   const t = Date.parse(endtime) - (new Date()); // разница в ms
  //   const days = Math.floor(t / (1000 * 60 * 60 * 24));
  //   const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  //   const minutes = Math.floor((t / (1000 * 60)) % 60);
  //   const seconds = Math.floor((t / 1000) % 60);
  //   return ({
  //     total: t, days, hours, minutes, seconds
  //   });
  // }

  // function setClock(selector, endtime) {
  //   const timer = document.querySelector(selector);

  //   const daysElement = timer.querySelector('#days'),
  //     hoursElement = timer.querySelector('#hours'),
  //     minElement = timer.querySelector('#minutes'),
  //     secElement = timer.querySelector('#seconds'),
  //     actionsTimer = setInterval(updateClock, 1000);

  //   updateClock(); // чтобы избежать показа старых значение элементов

  //   function updateClock() {
  //     const t = getRemainingTime(endtime);

  //     if (t.total <= 0) {
  //       // скрываем div с промо-акцией
  //       document.querySelector('.promotion').style.display = "none";
  //       clearInterval(actionsTimer);
  //     }

  //     daysElement.textContent = leadingZero(t.days, false);
  //     hoursElement.textContent = leadingZero(t.hours, true);
  //     minElement.textContent = leadingZero(t.minutes, true);
  //     secElement.textContent = leadingZero(t.seconds, true);
  //   }

  //   function leadingZero(value, isNeedZero) {
  //     if (value < 10 && isNeedZero) {
  //       return "0" + value;
  //     } else {
  //       return value;
  //     }
  //   }

  //   function replacePromoText(selector, dateStr) {
  //     let months = ["января", "февраля", "марта", "апреля", "мая", "июня",
  //       "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  //     const el = document.querySelector(selector);
  //     let [ymd, timeStr] = dateStr.split(' ');
  //     let [year, month, day] = ymd.split("-");
  //     let newStr = day.substring(0, 2) + " " + months[+month - 1] + " " + year + " " + (timeStr || "");
  //     el.innerHTML = el.innerHTML.replace('Акция закончится 1 августа в 00:00', 'Акция закончится ' + newStr);
  //   }

  //   replacePromoText('.promotion__descr', deadline);
  // }

  // setClock(".timer", deadline);

  // Modal window

  // const modalTriggers = document.querySelectorAll('[data-modal]'),
  //   modalWindow = document.querySelector('.modal');

  // // функции скрытия и показа модального  окна
  // function closeModalWindow() {
  //   modalWindow.classList.remove('show');
  //   modalWindow.classList.add('hide');
  //   document.body.style.overflow = '';
  // }
  // function showModalWindow() {
  //   modalWindow.classList.remove('hide');
  //   modalWindow.classList.add('show');
  //   document.body.style.overflow = 'hidden';
  // }

  // // вешаем обработчик собыйтий открытия окна
  // modalTriggers.forEach(trigger => {
  //   trigger.addEventListener('click', showModalWindow);
  // });

  // если кликнули за пределами окна (т.е. попали в div class=modal)
  // или нажали ESC, или элемент содержит атрибут "data-close", то закрыть окно
  // modalWindow.addEventListener('click', (event) => {
  //   if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
  //     closeModalWindow();
  //   }
  // });
  // // обработка ESC
  // document.addEventListener('keydown', (event) => {
  //   if (event.code === "Escape" && modalWindow.classList.contains('show')) {
  //     modalWindow.closeModalWindow();
  //   }
  // });

  // модальное окно должно появиться через 1 мин.
  // --- закомментировано, чтобы не мешало
  //const modalTimerId = setTimeout(showModalWindow, 60000);

  // Показать окно при прокрутке до конца всего сайта
  // function showModalWindowOnScroll() {
  //   if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
  //     modalWindow.showModalWindow();
  //     window.removeEventListener('scroll', showModalWindowOnScroll);
  //   }
  // }
  // window.addEventListener('scroll', showModalWindowOnScroll);

  // ------------- карточки продуктов ----------------------

  //   class MenuCard {
  //   constructor(src, alt, title, descr, price, parentSelector, ...classes) {
  //     this.src = src;
  //     this.alt = alt;
  //     this.title = title;
  //     this.descr = descr;
  //     this.price = price; // в USD
  //     this.classes = classes; // array or undefined
  //     this.parent = document.querySelector(parentSelector);
  //     this.currencyRate = 72.171;
  //     this.changeToRUR(); // преобразуем цену USD в RUR
  //   }
  //   // метод конвертации валюты в рубли. price в долларах
  //   changeToRUR() {
  //     this.price = Math.round(this.price * this.currencyRate, 2);
  //   }
  //   // отображение карточки продукта
  //   render() {
  //     let html = `
  //     <div class="menu__item">
  //     <img src=${this.src} alt=${this.alt}>
  //   <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
  //   <div class="menu__item-descr">${this.descr}</div>
  //   <div class="menu__item-divider"></div>
  //   <div class="menu__item-price">
  //       <div class="menu__item-cost">Цена:</div>
  //       <div class="menu__item-total"><span>${this.price}</span> руб.</div>
  //   </div></div>`;
  //     const el = document.createElement("div");
  //     if (this.classes.length === 0) {
  //       this.classes = ['menu__item'];
  //     }
  //     this.classes.forEach(className => el.classList.add(className));
  //     el.innerHTML = html;
  //     this.parent.append(el);
  //   }
  // } // class MenuCard
  // // jshint ignore: start
  // const selector = ".menu__field .container";
 
  // axios.get('http://localhost:3000/menu') // jshint ignore:line
  //   .then(data => {
  //     data.data.forEach(({ img, altimg, title, descr, price }) =>
  //       new MenuCard(img, altimg, title, descr, price, selector).render() //jshint ignore:line
  //     );
  //   });

  // --------------- 4.53, 59. Передача данных форм обратной связи на сервер -------------
  // const forms = document.querySelectorAll('form');
  // // массив, в котором данные  ходе выполнени запроса:
  // let message = {
  //   loading: "img/form/spinner.svg",
  //   success: "Спасибо! Мы с вами свяжемся.",
  //   failure: "Извините, произошла ошибка"
  // };

  // forms.forEach(item => {
  //   bindPostData(item);
  // });

  // // функция отправки фопрмы обратной сваязи на сервер.
  // // @param url - URL запроса
  // // @param data - данные формы
  // const postData = async (url, data) => {
  //   const res = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json; charset=utf-8'
  //     },
  //     body: data
  //   });
  //   return await res.json(); // ответ - promise!
  // };

  // // функция обработки и отправки данных формы обратной связи
  // function bindPostData(form) {
  //   form.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     // div для сообщения о результате в нижней части формы
  //     const statusMessage = document.createElement('div');
  //     statusMessage.src = message.loading;
  //     statusMessage.style.cssText = "display: 'block'; margin: 0 auto;";
  //     setTimeout(() => statusMessage.remove(), 5000);
  //     form.insertAdjacentElement('afterend', statusMessage); // всё равно не работает

  //     const formData = new FormData(form);
  //     const json = JSON.stringify(Object.fromEntries(formData.entries()));

  //     postData('http://localhost:3000/requests', json)
  //       .then(response => {
  //         console.log('SERVER RESP:', response);
  //         showThanksModal(message.success); // Окно "спасибо", закроется через 4 сек.
  //         statusMessage.remove(); // удаляем спиннер со статусом под формой
  //       })
  //       .catch(() => {
  //         showThanksModal(message.failure);
  //       })
  //       .finally(() => {
  //         form.reset();
  //       });

  //   }); // event listener
  // } // bindPostData()

  // ---------------- 54. Оповещение пользователя -----------

  // function showThanksModal(message) {
  //   const prevModalDialog = document.querySelector(".modal__dialog");
  //   // скрываем предыдущий контент
  //   prevModalDialog.classList.remove('show');
  //   prevModalDialog.classList.add('hide');
  //   showModalWindow();
  //   // вручную создаем новый div
  //   const thanksModal = document.createElement('div');
  //   thanksModal.classList.add("modal__dialog");
  //   thanksModal.innerHTML = `
  //   <div class="modal__content">
  //     <div data-close class="modal__close">&times;</div>
  //     <div class="modal__title">${message}</div>
  //   </div>
  //   `;
  //   const parent = document.querySelector('.modal');
  //   parent.append(thanksModal);
  //   setTimeout(() => {
  //     thanksModal.remove();
  //     prevModalDialog.classList.remove('hide');
  //     prevModalDialog.classList.add('show');
  //     closeModalWindow();
  //   }, 4000);
  // } // end thanksModal

  // --------------- 4.61 Slider ---
  // const slides = document.querySelectorAll(".offer__slide"),
  //   prevButton = document.querySelector(".offer__slider-prev"),
  //   nextButton = document.querySelector(".offer__slider-next"),
  //   countPlaceholder = document.querySelector('#current'),
  //   totalPlaceholder = document.querySelector('#total');
  // const slidesCount = slides.length;
  // let slideIndex = 1; // текущий слайд
  // totalPlaceholder.innerHTML = (slidesCount < 10) ? "0" + slidesCount : slidesCount.toString();

  // function showSlide(n) {
  //   if(n<1) {
  //     slideIndex=slidesCount;
  //   }
  //   if(n>slidesCount) {
  //     slideIndex=1;
  //   }
  //   countPlaceholder.innerHTML= (slideIndex<10) ? "0"+slideIndex.toString() : slideIndex.toString();
  //   // apply "hide" to all slides except current
  //   //slides.forEach(el => el.classList.add('hide')); // так не работает!
  //   slides.forEach(el => el.style.display='none');
  //   slides[slideIndex-1].style.display='block';

  // }

  // prevButton.addEventListener('click',()=> {
  //   showSlide(--slideIndex);
  // });
  // nextButton.addEventListener('click',()=> {
  //   showSlide(++slideIndex);
  // });
  // showSlide(slideIndex); // начальный показ 1-го слайда
  // ----------- slides - вариант 2 ------------------
  // slideIndex со старого урока
  // const slidesWrapper = document.querySelector(".offer__slider-wrapper"),
  //   slidesField = document.querySelector(".offer__slider-inner"),
  //   slider = document.querySelector(".offer__slider");

  // const slideWidth = +window.getComputedStyle(slidesWrapper).width.split('px')[0]; // 650, number
  // let slideOffset = 0;
  // slidesField.style.width = slidesCount * 100 + '%'; // 400%
  // slidesField.style.display = 'flex';
  // slidesField.style.transition = "0.5s all";
  // slidesWrapper.style.overflow = 'hidden';
  // slides.forEach(s => s.style.width = slideWidth + 'px'); // все слайды по ширине окна - 650px
  // slider.style.position = 'relative';

  // const indicators = document.createElement("ol");
  // indicators.classList.add("carousel-indicators");
  // slider.append(indicators);
  // // размешаем точки
  // for (let i = 0; i < slidesCount; i++) {
  //   const dot = document.createElement("li");
  //   dot.setAttribute("data-slide-to", i + 1);
  //   dot.classList.add("dot");
  //   if (i === 0) {
  //     dot.style.opacity = 1;
  //   }
  //   indicators.append(dot);
  // }

  // // добавляем слушатели событий на точки
  // document.querySelectorAll(".dot").forEach(dot => {
  //   dot.addEventListener('click', () => {
  //     slideIndex = +dot.getAttribute('data-slide-to');
  //     slideOffset = slideWidth * (slideIndex - 1);
  //     slidesField.style.transform = `translateX(-${slideOffset}px)`;
  //     setActiveDot();
  //     showNumberOfCurrentSlide(slideIndex);

  //   });
  // });

  // function setActiveDot() {
  //   document.querySelectorAll(".dot").forEach(dot => dot.style.opacity = 0.5);
  //   document.querySelector(`[data-slide-to="${slideIndex}"`).style.opacity = 1;
  // }

  // nextButton.addEventListener('click', () => {
  //   if (slideOffset == slideWidth * (slidesCount - 1)) {
  //     slideOffset = 0;
  //   } else {
  //     slideOffset += slideWidth;
  //   }
  //   slidesField.style.transform = `translateX(-${slideOffset}px)`; // -
  //   showNumberOfCurrentSlide(++slideIndex);
  //   setActiveDot();
  // });

  // prevButton.addEventListener('click', () => {
  //   if (slideOffset == 0) {
  //     slideOffset = slideWidth * (slidesCount - 1); // 1950, а у "ленты" - 2600px
  //   } else {
  //     slideOffset -= slideWidth;
  //   }
  //   slidesField.style.transform = `translateX(-${slideOffset}px)`; // в стилях есть transform: translateX(-1950px)!
  //   showNumberOfCurrentSlide(--slideIndex);
  //   setActiveDot();
  // });

  // // обновить N текущего слайда в html
  // function showNumberOfCurrentSlide(n) {
  //   if (n < 1) {
  //     slideIndex = slidesCount;
  //   }
  //   if (n > slidesCount) {
  //     slideIndex = 1;
  //   }
  //   countPlaceholder.textContent = (slideIndex < 10) ? "0" + slideIndex : slideIndex;
  // }

  // калькулятор калорий
  // const calcResult = document.querySelector(".calculating__result span");
  // let sex, height, weight, age, ratio;

  // if (localStorage.getItem('sex')) {
  //   sex = localStorage.getItem('sex');
  // } else {
  //   sex = 'female';
  //   localStorage.setItem('sex', sex); // сразу сохраняем значение по умолчанию
  // }
  // if (localStorage.getItem('ratio')) {
  //   ratio = +localStorage.getItem('ratio');
  // } else {
  //   ratio = 1.375;
  //   localStorage.setItem('ratio', ratio);
  // }

  // function initLocalSettings(selector, activeClass) {
  //   const elements = document.querySelectorAll(selector);
  //   elements.forEach(el => {
  //     el.classList.remove(activeClass);
  //     if (el.getAttribute("id") === localStorage.getItem('sex')) {
  //       el.classList.add(activeClass);
  //     }
  //     if (el.getAttribute("data-ratio") === localStorage.getItem('ratio')) {
  //       el.classList.add(activeClass);
  //     }
  //   });
  // }

  // calc.initLocalSettings('#gender div', 'calculating__choose-item_active');
  // calc.initLocalSettings('#activity div', 'calculating__choose-item_active');



  // функция расчета и отображения суточной потребности калорий на сайте
  // function calcTotal() {
  //   console.log(sex, height, weight, age, ratio);
  //   if (!sex || !height || !weight || !age || !ratio) {
  //     calcResult.textContent = "____";
  //     return;
  //   }
  //   let bmr;
  //   if (sex === 'female') {
  //     //BMR = 447.6 + (9.2 x вес, кг) + (3.1 х рост, cм) – (4.3 х возраст, лет)
  //     bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
  //   } else {
  //     //BMR = 88.36 + (13.4 x вес, кг) + (4.8 х рост, см) – (5.7 х возраст, лет)
  //     bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
  //   }
  //   bmr = Math.round(bmr * ratio);
  //   calcResult.textContent = bmr;
  // }

  // calcTotal();

  // получаем значения из <div>
  // function getStaticInformation(parentSelector, activeClass) {
  //   const elements = document.querySelectorAll(`${parentSelector} div`);

  //   elements.forEach(el => {
  //     el.addEventListener('click', (e) => {
  //       if (e.target.getAttribute('data-ratio')) {
  //         ratio = +e.target.getAttribute('data-ratio');
  //         localStorage.setItem('ratio', ratio);
  //       } else {
  //         sex = e.target.getAttribute("id");
  //         localStorage.setItem('sex', sex);
  //       }
  //       // switch activity class
  //       elements.forEach(el => el.classList.remove(activeClass));
  //       e.target.classList.add(activeClass);
  //       calcTotal();
  //     }); // event listener
  //   });
  // }

  // calc.getStaticInformation('#gender', 'calculating__choose-item_active');
  // calc.getStaticInformation('#activity', 'calculating__choose-item_active');

  // function getDynamicInformation(selector) {
  //   const input = document.querySelector(selector);
  //   input.addEventListener('input', () => {
  //     if (input.value.match(/\D/g)) { // общая проверка на число
  //       input.style.border = "2px solid red";
  //     } else {
  //       input.style.border = "none";
  //     }
  //     const value = +input.value;
  //     switch (input.getAttribute("id")) {
  //       case 'height':
  //         if (value > 0 && value < 250) {
  //           height = value;
  //           input.style.border = "none";
  //         } else {
  //           height = undefined;
  //           input.style.border = "2px solid red";
  //         }
  //         break;
  //       case 'weight':
  //         if (value > 0 && value < 250) {
  //           weight = value;
  //         } else {
  //           weight = undefined;
  //         }
  //         break;
  //       case 'age':
  //         if (value > 0 && value < 190) {
  //           age = value;
  //         } else {
  //           age = undefined;
  //         }
  //         break;
  //     } // case
  //     calcTotal();
  //   });

  // }

  // calc.getDynamicInformation("#height");
  // calc.getDynamicInformation("#weight");
  // calc.getDynamicInformation("#age");

}); // end listener 'DOMContentLoaded'




