/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// модуль - калькулятор калорий
function calc() {
  const calcResult = document.querySelector(".calculating__result span");
  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', sex); // сразу сохраняем значение по умолчанию
  }
  if (localStorage.getItem('ratio')) {
    ratio = +localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', ratio);
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.classList.remove(activeClass);
      if (el.getAttribute("id") === localStorage.getItem('sex')) {
        el.classList.add(activeClass);
      }
      if (el.getAttribute("data-ratio") === localStorage.getItem('ratio')) {
        el.classList.add(activeClass);
      }
    });
  }

  function calcTotal() {
    //console.log(sex, height, weight, age, ratio);
    if (!sex || !height || !weight || !age || !ratio) {
      calcResult.textContent = "____";
      return;
    }
    let bmr;
    if (sex === 'female') {
      //BMR = 447.6 + (9.2 x вес, кг) + (3.1 х рост, cм) – (4.3 х возраст, лет)
      bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    } else {
      //BMR = 88.36 + (13.4 x вес, кг) + (4.8 х рост, см) – (5.7 х возраст, лет)
      bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    }
    bmr = Math.round(bmr * ratio);
    calcResult.textContent = bmr;
  }

  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    elements.forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', ratio);
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem('sex', sex);
        }
        // switch activity class
        elements.forEach(el => el.classList.remove(activeClass));
        e.target.classList.add(activeClass);
        calcTotal();
      }); // event listener
    });
  }

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) { // общая проверка на число
        input.style.border = "2px solid red";
      } else {
        input.style.border = "none";
      }
      const value = +input.value;
      switch (input.getAttribute("id")) {
        case 'height':
          if (value > 0 && value < 250) {
            height = value;
            input.style.border = "none";
          } else {
            height = undefined;
            input.style.border = "2px solid red";
          }
          break;
        case 'weight':
          if (value > 0 && value < 250) {
            weight = value;
          } else {
            weight = undefined;
          }
          break;
        case 'age':
          if (value > 0 && value < 190) {
            age = value;
          } else {
            age = undefined;
          }
          break;
      } // case
      calcTotal();
    });

  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('#activity div', 'calculating__choose-item_active');
  getStaticInformation('#gender', 'calculating__choose-item_active');
  getStaticInformation('#activity', 'calculating__choose-item_active');
  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");

  calcTotal();

}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function cards() {
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
      this.changePriceToRUR(); // преобразуем цену USD в RUR
    }
    // метод конвертации валюты в рубли. price в долларах
    changePriceToRUR() {
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
  } // class MenuCard
  const selector = ".menu__field .container";
 
  axios.get('http://localhost:3000/menu') //jshint ignore:line
    .then(data => {
      data.data.forEach(({ img, altimg, title, descr, price }) =>
        new MenuCard(img, altimg, title, descr, price, selector).render()
      );
    });

}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/deadline.js":
/*!********************************!*\
  !*** ./js/modules/deadline.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function deadline() {
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
}

/* harmony default export */ __webpack_exports__["default"] = (deadline);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modalWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modalWindow */ "./js/modules/modalWindow.js");


function form() {
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
  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: data
    });
    return await res.json(); // ответ - promise!
  };

  // функция обработки и отправки данных формы обратной связи
  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // div для сообщения о результате в нижней части формы
      const statusMessage = document.createElement('div');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = "display: 'block'; margin: 0 auto;";
      setTimeout(() => statusMessage.remove(), 5000);
      form.insertAdjacentElement('afterend', statusMessage); // всё равно не работает

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then(response => {
          console.log('SERVER RESP:', response);
          showThanksModal(message.success); // Окно "спасибо", закроется через 4 сек.
          statusMessage.remove(); // удаляем спиннер со статусом под формой
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });

    }); // event listener
  } // bindPostData()

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    // скрываем предыдущий контент
    prevModalDialog.classList.remove('show');
    prevModalDialog.classList.add('hide');
    Object(_modalWindow__WEBPACK_IMPORTED_MODULE_0__["showModalWindow"])(".modal");
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
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove('hide');
      prevModalDialog.classList.add('show');
      Object(_modalWindow__WEBPACK_IMPORTED_MODULE_0__["closeModalWindow"])(".modal");
    }, 4000);
  } // end thanksModal
}

/* harmony default export */ __webpack_exports__["default"] = (form);

/***/ }),

/***/ "./js/modules/modalWindow.js":
/*!***********************************!*\
  !*** ./js/modules/modalWindow.js ***!
  \***********************************/
/*! exports provided: closeModalWindow, showModalWindow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModalWindow", function() { return closeModalWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showModalWindow", function() { return showModalWindow; });
function closeModalWindow(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.remove('show');
  modalWindow.classList.add('hide');
  document.body.style.overflow = '';
}
function showModalWindow(modalSelector, timerId) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.remove('hide');
  modalWindow.classList.add('show');
  document.body.style.overflow = 'hidden';
  if(timerId) {
    clearInterval(timerId);
  }
}


function modal(triggerSelector, modalSelector,timerId) {
const modalTriggers = document.querySelectorAll(triggerSelector),
      modalWindow = document.querySelector(modalSelector);

  // функции скрытия и показа модального  окна
  // вешаем обработчики собыйтий открытия окна
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => showModalWindow(modalSelector,timerId));
  });

  modalWindow.addEventListener('click', (event) => {
    if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
      closeModalWindow(modalSelector);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.code === "Escape" && modalWindow.classList.contains('show')) {
      closeModalWindow(modalSelector);
    }
  });

  function showModalWindowOnScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModalWindow(modalSelector,timerId);
      window.removeEventListener('scroll', showModalWindowOnScroll);
    }
  }
  window.addEventListener('scroll', showModalWindowOnScroll);

 
}

/* harmony default export */ __webpack_exports__["default"] = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider() {

const slides = document.querySelectorAll(".offer__slide"),
    prevButton = document.querySelector(".offer__slider-prev"),
    nextButton = document.querySelector(".offer__slider-next"),
    countPlaceholder = document.querySelector('#current'),
    totalPlaceholder = document.querySelector('#total');
  const slidesCount = slides.length;
  let slideIndex = 1; // текущий слайд
  totalPlaceholder.innerHTML = (slidesCount < 10) ? "0" + slidesCount : slidesCount.toString();

  const slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    slider = document.querySelector(".offer__slider");

  const slideWidth = +window.getComputedStyle(slidesWrapper).width.split('px')[0]; // 650, number
  let slideOffset = 0;
  slidesField.style.width = slidesCount * 100 + '%'; // 400%
  slidesField.style.display = 'flex';
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(s => s.style.width = slideWidth + 'px'); // все слайды по ширине окна - 650px
  slider.style.position = 'relative';

  const indicators = document.createElement("ol");
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);
  // размешаем точки
  for (let i = 0; i < slidesCount; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");
    if (i === 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
  }

  // добавляем слушатели событий на точки
  document.querySelectorAll(".dot").forEach(dot => {
    dot.addEventListener('click', () => {
      slideIndex = +dot.getAttribute('data-slide-to');
      slideOffset = slideWidth * (slideIndex - 1);
      slidesField.style.transform = `translateX(-${slideOffset}px)`;
      setActiveDot();
      showNumberOfCurrentSlide(slideIndex);

    });
  });

  function setActiveDot() {
    document.querySelectorAll(".dot").forEach(dot => dot.style.opacity = 0.5);
    document.querySelector(`[data-slide-to="${slideIndex}"`).style.opacity = 1;
  }

  nextButton.addEventListener('click', () => {
    if (slideOffset == slideWidth * (slidesCount - 1)) {
      slideOffset = 0;
    } else {
      slideOffset += slideWidth;
    }
    slidesField.style.transform = `translateX(-${slideOffset}px)`; // -
    showNumberOfCurrentSlide(++slideIndex);
    setActiveDot();
  });

  prevButton.addEventListener('click', () => {
    if (slideOffset == 0) {
      slideOffset = slideWidth * (slidesCount - 1); // 1950, а у "ленты" - 2600px
    } else {
      slideOffset -= slideWidth;
    }
    slidesField.style.transform = `translateX(-${slideOffset}px)`; // в стилях есть transform: translateX(-1950px)!
    showNumberOfCurrentSlide(--slideIndex);
    setActiveDot();
  });

  // обновить N текущего слайда в html
  function showNumberOfCurrentSlide(n) {
    if (n < 1) {
      slideIndex = slidesCount;
    }
    if (n > slidesCount) {
      slideIndex = 1;
    }
    countPlaceholder.textContent = (slideIndex < 10) ? "0" + slideIndex : slideIndex;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

function tabs() {
  const menuItems = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    menuContainer = document.querySelector(".tabheader__items");


  function hideTabContent() {
    tabContent.forEach(item => item.classList.add("hide"));
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
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modalWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modalWindow */ "./js/modules/modalWindow.js");
/* harmony import */ var _modules_deadline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/deadline */ "./js/modules/deadline.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");










window.addEventListener('DOMContentLoaded', () => {
  
  const modalWindowTimerId = setInterval(()=>Object(_modules_modalWindow__WEBPACK_IMPORTED_MODULE_1__["showModalWindow"])('.modal',modalWindowTimerId),60000 );
  Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
  Object(_modules_modalWindow__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]','.modal',modalWindowTimerId);
  Object(_modules_deadline__WEBPACK_IMPORTED_MODULE_2__["default"])();
  Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  Object(_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])();
  Object(_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();
  Object(_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
  
}); 






/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map