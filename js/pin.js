'use strict';

/**
 * Модуль для отрисовки пина и взаимодействия с ним
 */

(function () {
  window.pin = {
    renderMapPins: function (mapPins) {
      var frag = document.createDocumentFragment();

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
      }

      document.querySelector('.map__pins').appendChild(frag);
    }
  };
})();
