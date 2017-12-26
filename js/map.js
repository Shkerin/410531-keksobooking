'use strict';

/**
 * Модуль для работы с картой
 */

(function () {
  var utils = window.utils;

  var MIN_COORD_Y = 59;
  var MAX_COORD_Y = 459;
  var IMG_HEIGHT = 62;
  var PIN_HEIGHT = 10;

  var htmlElem = document.querySelector('html');
  var mapElem = document.querySelector('.map');
  var pinMainElem = mapElem.querySelector('.map__pin--main');

  var showMapHandler = function () {
    var formElem = document.querySelector('.notice__form');
    var noticeHeaderElem = document.querySelector('.notice__header');

    mapElem.classList.remove('map--faded');
    formElem.classList.remove('notice__form--disabled');
    noticeHeaderElem.removeAttribute('disabled');
    utils.removeAttributeAll('.form__element', 'disabled');

    window.pins.render();

    pinMainElem.removeEventListener('mouseup', showMapHandler);
  };

  pinMainElem.addEventListener('mouseup', showMapHandler);

  // Вычисление смещения прокрутки
  var getScrollOffset = function () {
    return window.scrollY || window.scrollTop || htmlElem.scrollTop;
  };

  // Вычисление координат главного пина с учётом вертикальной прокрутки
  var calculateCoords = function (evt) {
    var addressElem = document.querySelector('#address');

    var coordX = Math.floor(evt.clientX - mapElem.offsetLeft);
    var coordY = Math.floor(evt.clientY - mapElem.offsetTop + getScrollOffset());

    // Ограничить перемещение главного пина
    if (coordY < MIN_COORD_Y) {
      coordY = MIN_COORD_Y;
    } else if (coordY > MAX_COORD_Y) {
      coordY = MAX_COORD_Y;
    }

    pinMainElem.style.left = coordX + 'px';
    pinMainElem.style.top = coordY + 'px';

    // Вывести координаты в поле адреса с учётом острия главного пина
    coordY += (IMG_HEIGHT / 2) + PIN_HEIGHT;

    addressElem.value = 'x: ' + coordX + ', y: ' + coordY;
  };

  // Обработчики перемещения главного пина по карте и вывод его координат в поле адреса
  pinMainElem.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    calculateCoords(evt);

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      calculateCoords(moveEvt);
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
