'use strict';

/**
 * Модуль для отрисовки пинов и взаимодействия с ними
 */

(function () {
  var PIN_WEIGHT = 46;
  var PIN_HEIGHT = 10;

  var sourcePins = [];
  var filterPins = [];

  var clickPinHandler = function (evt) {
    var elem = evt.currentTarget;
    window.showCard(elem, filterPins);
  };

  var createPinElem = function (pin) {
    var locationX = pin.location.x - PIN_WEIGHT / 2;
    var locationY = pin.location.y - PIN_HEIGHT;
    var avatar = pin.author.avatar;

    var pinElem = document.createElement('div');
    pinElem.innerHTML =
      '<button style="left: ' + locationX + 'px; top: ' + locationY + 'px;" class="map__pin" data-uid=' + pin.uid + '>' +
      '<img src="' + avatar + '" width="40" height="40" draggable="false">' +
      '</button>';

    return pinElem.children[0];
  };

  var removePins = function () {
    var pinsElem = document.querySelector('.map__pins');
    var pins = pinsElem.querySelectorAll('.map__pin:not(.map__pin--main)');
    [].forEach.call(pins, function (pinElem) {
      pinElem.removeEventListener('click', clickPinHandler);
      pinsElem.removeChild(pinElem);
    });
  };

  var renderPins = function (pins) {
    var frag = document.createDocumentFragment();

    pins.forEach(function (value, idx) {
      value.uid = idx;
      var pinElem = createPinElem(value);
      frag.appendChild(pinElem);

      pinElem.addEventListener('click', clickPinHandler);
    });

    document.querySelector('.map__pins').appendChild(frag);
  };

  var updatePins = function () {
    removePins();
    filterPins = window.filter(sourcePins);
    renderPins(filterPins);
  };

  var loadAndRender = function () {
    var loadHandler = function (data) {
      sourcePins = data;
      updatePins();
    };

    window.backend.loadPins(loadHandler, window.error.show);
  };

  window.pins = {
    render: loadAndRender,
    update: updatePins
  };
})();
