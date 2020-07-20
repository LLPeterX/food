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

export default calc;