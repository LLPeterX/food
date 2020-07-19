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
  
}); 




