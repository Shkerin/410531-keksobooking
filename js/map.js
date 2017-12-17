'use strict';

/**
 * Модуль для работы с картой
 */

(function () {
  var utils = window.utils;
  var data = window.data;
  var pin = window.pin;
  var card = window.card;

  var mapPins = data.createMapPins(8);

  var mapPinMainElem = document.querySelector('.map__pin--main');
  mapPinMainElem.addEventListener('mouseup', function () {
    utils.removeClass('.map', 'map--faded');
    utils.removeClass('.notice__form', 'notice__form--disabled');
    utils.removeAttribute('.notice__header', 'disabled');
    utils.removeAttributeAll('.form__element', 'disabled');

    pin.renderMapPins(mapPins);
  });

  // TODO вынести оброботчик в функцию renderMapPins
  var mapPinHandler = function () {
    var elem = document.activeElement;
    if (elem instanceof HTMLElement &&
      elem.classList.contains('map__pin') &&
      !elem.classList.contains('map__pin--main')) {
      card.showPopup(elem, mapPins);
    }
  };
  document.addEventListener('click', mapPinHandler);
  document.addEventListener('keydown', function (evt) {
    utils.isEnterEvent(evt, mapPinHandler);
  });
})();
