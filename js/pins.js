'use strict';

/**
 * Модуль для отрисовки пинов и взаимодействия с ними
 */

(function () {
  var utils = window.utils;

  var renderPins = function () {
    var createPinElem = function (pin) {
      var locationX = pin.location.x - 46 / 2;
      var locationY = pin.location.y - 64;
      var avatar = pin.author.avatar;

      var pinElem = document.createElement('div');
      pinElem.innerHTML =
        '<button style="left: ' + locationX + 'px; top: ' + locationY + 'px;" class="map__pin" data-uid=' + pin.uid + '>' +
        '<img src="' + avatar + '" width="40" height="40" draggable="false">' +
        '</button>';

      return pinElem;
    };

    var loadHandler = function (data) {
      var frag = document.createDocumentFragment();

      for (var i = 0; i < data.length; i++) {
        data[i].uid = i;
        var pinElem = createPinElem(data[i]);
        frag.appendChild(pinElem);

        var mapPinHandler = function (evt) {
          var elem = evt.currentTarget;
          window.showCard(elem, data);
        };

        pinElem.children[0].addEventListener('click', mapPinHandler);
        pinElem.children[0].addEventListener('keydown', function (evt) {
          utils.isEnterEvent(evt, mapPinHandler);
        });
      }

      document.querySelector('.map__pins').appendChild(frag);
    };

    var loadErrorHandler = function (msg) {
      utils.addClass('.map', 'map--faded');
      utils.addClass('.notice__form', 'notice__form--disabled');
      utils.addAttribute('.notice__header', 'disabled');
      utils.addAttributeAll('.form__element', 'disabled');

      var divError = document.createElement('div');

      divError.classList.add('error');
      divError.innerHTML =
        '<h3>Ошибка получения данных с вервера</h3>' +
        '<p>' + msg + '</p>';

      document.querySelector('.map').appendChild(divError);
    };

    window.backend.load(loadHandler, loadErrorHandler);
  };

  window.pins = {
    render: renderPins
  };
})();
