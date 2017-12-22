'use strict';

/**
 * Модуль для отрисовки пинов и взаимодействия с ними
 */

(function () {
  var utils = window.utils;

  var render = function () {
    var sourcePins = [];

    var createPinElem = function (pin) {
      var locationX = pin.location.x - 46 / 2;
      var locationY = pin.location.y - 64;
      var avatar = pin.author.avatar;

      var pinElem = document.createElement('div');
      pinElem.innerHTML =
        '<button style="left: ' + locationX + 'px; top: ' + locationY + 'px;" class="map__pin" data-uid=' + pin.uid + '>' +
        '<img src="' + avatar + '" width="40" height="40" draggable="false">' +
        '</button>';

      return pinElem.children[0];
    };

    var removePins = function () {
      var mapPinsElem = document.querySelector('.map__pins');
      var pinsArray = mapPinsElem.querySelectorAll('.map__pin:not(.map__pin--main)');
      [].forEach.call(pinsArray, function (elem) {
        mapPinsElem.removeChild(elem);
      });
    };

    var renderPins = function (pins) {
      var frag = document.createDocumentFragment();

      for (var i = 0; i < pins.length; i++) {
        pins[i].uid = i;
        var pinElem = createPinElem(pins[i]);
        frag.appendChild(pinElem);

        var mapPinHandler = function (evt) {
          var elem = evt.currentTarget;
          window.showCard(elem, pins);
        };

        pinElem.addEventListener('click', mapPinHandler);
        pinElem.addEventListener('keydown', function (evt) {
          utils.isEnterEvent(evt, mapPinHandler);
        });
      }

      document.querySelector('.map__pins').appendChild(frag);
    };

    var updatePins = function () {
      var samePins = sourcePins.filter(function (pin) {
        var offer = pin.offer;
        var result = typeElem.value === 'any' || typeElem.value === offer.type;
        if (result && priceElem.value !== 'any') {
          switch (priceElem.value) {
            case 'middle':
              result = offer.price >= 10000 && offer.price <= 50000;
              break;
            case 'low':
              result = offer.price < 10000;
              break;
            case 'high':
              result = offer.price >= 50000;
              break;
          }
        }
        if (result && roomsElem.value !== 'any') {
          result = roomsElem.value === ('' + offer.rooms);
        }

        if (result && guestsElem.value !== 'any') {
          result = guestsElem.value === ('' + offer.guests);
        }

        var filterFeature = function (elem, offerList) {
          var flag = false;
          for (var i = 0; i < offerList.features.length; i++) {
            var feature = offerList.features[i];
            if (elem.value === feature) {
              flag = true;
              break;
            }
          }
          return flag;
        };

        if (result && filterWifiElem.checked) {
          result = filterFeature(filterWifiElem, offer);
        }

        if (result && filterDishwasherElem.checked) {
          result = filterFeature(filterDishwasherElem, offer);
        }

        if (result && filterParkingElem.checked) {
          result = filterFeature(filterParkingElem, offer);
        }

        if (result && filterWasherElem.checked) {
          result = filterFeature(filterWasherElem, offer);
        }

        if (result && filterElevatorElem.checked) {
          result = filterFeature(filterElevatorElem, offer);
        }

        if (result && filterConditionerElem.checked) {
          result = filterFeature(filterConditionerElem, offer);
        }

        return result;
      });

      removePins();
      renderPins(samePins);
    };

    var changeHousingHandler = function () {
      updatePins();
    };

    var typeElem = document.querySelector('#housing-type');
    var priceElem = document.querySelector('#housing-price');
    var roomsElem = document.querySelector('#housing-rooms');
    var guestsElem = document.querySelector('#housing-guests');
    var filterWifiElem = document.querySelector('#filter-wifi');
    var filterDishwasherElem = document.querySelector('#filter-dishwasher');
    var filterParkingElem = document.querySelector('#filter-parking');
    var filterWasherElem = document.querySelector('#filter-washer');
    var filterElevatorElem = document.querySelector('#filter-elevator');
    var filterConditionerElem = document.querySelector('#filter-conditioner');

    typeElem.addEventListener('change', changeHousingHandler);
    priceElem.addEventListener('change', changeHousingHandler);
    roomsElem.addEventListener('change', changeHousingHandler);
    guestsElem.addEventListener('change', changeHousingHandler);
    filterWifiElem.addEventListener('change', changeHousingHandler);
    filterDishwasherElem.addEventListener('change', changeHousingHandler);
    filterParkingElem.addEventListener('change', changeHousingHandler);
    filterWasherElem.addEventListener('change', changeHousingHandler);
    filterElevatorElem.addEventListener('change', changeHousingHandler);
    filterConditionerElem.addEventListener('change', changeHousingHandler);

    var loadHandler = function (data) {
      sourcePins = data;
      updatePins();
    };

    window.backend.loadPins(loadHandler, window.error.showErrorWindow);
  };

  window.pins = {
    render: render
  };
})();
