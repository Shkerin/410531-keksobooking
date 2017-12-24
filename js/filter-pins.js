'use strict';

(function () {
  var PRICE = {
    'min': 10000,
    'max': 50000
  };

  var filterPins = function (pins) {
    return pins.filter(function (pin) {
      var offer = pin.offer;
      var result = typeElem.value === 'any' || typeElem.value === offer.type;

      if (result && priceElem.value !== 'any') {
        switch (priceElem.value) {
          case 'middle':
            result = offer.price >= PRICE.min && offer.price <= PRICE.max;
            break;
          case 'low':
            result = offer.price < PRICE.min;
            break;
          case 'high':
            result = offer.price >= PRICE.max;
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
  };

  var changeHousingHandler = function () {
    window.pins.update();
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

  window.filter = filterPins;
})();
