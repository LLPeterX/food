'use strict';
import tabs from './modules/tabs';
import modal from './modules/modalWindow';
import timer from './modules/deadline';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import {showModalWindow} from './modules/modalWindow';

window.addEventListener('DOMContentLoaded', () => {
  
  const modalWindowTimerId = setInterval(()=>showModalWindow('.modal',modalWindowTimerId),60000 );
  tabs();
  modal('[data-modal]','.modal',modalWindowTimerId);
  timer();
  cards();
  forms('form',modalWindowTimerId);
  slider();
  calc();
  
}); 




