'use strict';

/**
 * Модуль для работы с картой
 */

(function () {
  var utils = window.utils;
  var pins = window.pins;

  var mapElem = document.querySelector('.map');
  var pinMainElem = document.querySelector('.map__pin--main');
  var isRenderPins = false;

  pinMainElem.addEventListener('mouseup', function () {
    utils.removeClass('.map', 'map--faded');
    utils.removeClass('.notice__form', 'notice__form--disabled');
    utils.removeAttribute('.notice__header', 'disabled');
    utils.removeAttributeAll('.form__element', 'disabled');

    if (!isRenderPins) {
      isRenderPins = true;
      pins.render();
    }
  });

  // Перемещение главного пина по карте и вывод его координат в поле адреса
  pinMainElem.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var addressElem = document.querySelector('#address');

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var coordX = moveEvt.clientX - mapElem.offsetLeft;
      var coordY = moveEvt.clientY - mapElem.offsetTop;
      var minCoordY = 100;
      var maxCoordY = 650;
      if (coordY < minCoordY) {
        coordY = minCoordY;
      } else if (coordY > maxCoordY) {
        coordY = maxCoordY;
      }

      pinMainElem.style.left = coordX + 'px';
      pinMainElem.style.top = coordY + 'px';

      addressElem.value = 'x: ' + (moveEvt.clientX + 64 / 2) + ', y: ' + (moveEvt.clientY + 74 / 2);
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
