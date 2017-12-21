'use strict';

/**
 * Модуль для отрисовки пинов и взаимодействия с ними
 */

(function () {
  var utils = window.utils;
  var data = window.data;

  var renderMapPins = function () {
    var frag = document.createDocumentFragment();

    var mapPins = data.create(8);
    for (var i = 0; i < mapPins.length; i++) {
      var pin = mapPins[i];
      var locationX = pin.location.x - 46 / 2;
      var locationY = pin.location.y - 64;
      var avatar = pin.author.avatar;

      var pinElem = document.createElement('div');
      pinElem.innerHTML =
        '<button style="left: ' + locationX + 'px; top: ' + locationY + 'px;" class="map__pin" data-uid=' + pin.uid + '>' +
        '<img src="' + avatar + '" width="40" height="40" draggable="false">' +
        '</button>';

      frag.appendChild(pinElem);

      var mapPinHandler = function (evt) {
        var elem = evt.currentTarget;
        window.showCard(elem, mapPins);
      };

      pinElem.children[0].addEventListener('click', mapPinHandler);
      pinElem.children[0].addEventListener('keydown', function (evt) {
        utils.isEnterEvent(evt, mapPinHandler);
      });
    }

    document.querySelector('.map__pins').appendChild(frag);
  };

  window.pins = {
    render: renderMapPins
  };
})();
