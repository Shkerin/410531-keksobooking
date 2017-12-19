'use strict';

/**
 * Модуль для работы с картой
 */

(function () {
  var utils = window.utils;
  var pins = window.pins;

  var mapPinMainElem = document.querySelector('.map__pin--main');
  mapPinMainElem.addEventListener('mouseup', function () {
    utils.removeClass('.map', 'map--faded');
    utils.removeClass('.notice__form', 'notice__form--disabled');
    utils.removeAttribute('.notice__header', 'disabled');
    utils.removeAttributeAll('.form__element', 'disabled');

    pins.render();
  });
})();
