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

module.exports = slider;