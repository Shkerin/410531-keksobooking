'use strict';

/**
 * Модуль для работы с картой
 */

(function () {
  var utils = window.utils;
  var pins = window.pins;

  var pinMainElem = document.querySelector('.map__pin--main');
  var mapElem = document.querySelector('.map');

  var showMapHandler = function () {
    utils.removeClass('.map', 'map--faded');
    utils.removeClass('.notice__form', 'notice__form--disabled');
    utils.removeAttribute('.notice__header', 'disabled');
    utils.removeAttributeAll('.form__element', 'disabled');

    pins.render();

    pinMainElem.removeEventListener('mouseup', showMapHandler);
  };

  pinMainElem.addEventListener('mouseup', showMapHandler);

  // Вычисление смещения прокрутки
  var getScrollOffset = function () {
    return window.scrollY || window.scrollTop ||
      document.getElementsByTagName('html')[0].scrollTop;
  };

  // Перемещение главного пина по карте и вывод его координат в поле адреса
  pinMainElem.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var addressElem = document.querySelector('#address');

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      // Вычислить координаты главного пина с учётом вертикальной прокрутки
      var coordX = moveEvt.clientX - mapElem.offsetLeft;
      var coordY = moveEvt.clientY - mapElem.offsetTop + getScrollOffset();

      // Ограничить перемещение главного пина
      var MIN_COORD_Y = 100;
      var MAX_COORD_Y = 650;
      if (coordY < MIN_COORD_Y) {
        coordY = MIN_COORD_Y;
      } else if (coordY > MAX_COORD_Y) {
        coordY = MAX_COORD_Y;
      }

      pinMainElem.style.left = coordX + 'px';
      pinMainElem.style.top = coordY + 'px';

      // Вывести координаты в поле адреса с учётом острия главного пина
      var IMAGE_HEIGHT = 62;
      var PIN_HEIGHT = 10;
      coordY += (IMAGE_HEIGHT / 2) + PIN_HEIGHT;

      addressElem.value = 'x: ' + coordX + ', y: ' + coordY;
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      mapElem.removeEventListener('mousemove', mouseMoveHandler);
      mapElem.removeEventListener('mouseup', mouseUpHandler);
    };

    mapElem.addEventListener('mousemove', mouseMoveHandler);
    mapElem.addEventListener('mouseup', mouseUpHandler);
  });
})();
