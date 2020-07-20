'use strict';
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClassName) {
  const menuItems = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);


  function hideTabContent() {
    tabContent.forEach(item => item.classList.add("hide"));
    menuItems.forEach(item => {
      item.classList.remove(activeClassName);
      item.classList.remove("fade");
    }
    );
  }

  // функция показать i-й div контента
  function showTabContent(i = 0) { //default i=0
    tabContent[i].classList.replace('hide', 'show');
    menuItems[i].classList.add(activeClassName);
    tabContent[i].classList.add("fade");
    menuItems[i].classList.add("fade");
  }

  tabsParent.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
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

export default tabs;