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

export default  cards;