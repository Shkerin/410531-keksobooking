'use strict';

(function () {
  var isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  var getRandomInt = function (min, max) {
    if (!isNumeric(min) || !isNumeric(max)) {
      throw new TypeError('Exception of computing a random number: min or max is not numeric');
    } else if (min > max) {
      throw new RangeError('Exception of computing a random number: min > max');
    } else if (min === max) {
      return min;
    }

    var rand = Math.random() * (max - min + 1);
    return Math.floor(rand) + min;
  };

  var getRandomValueFromArray = function (array) {
    if (!(array instanceof Array)) {
      throw new TypeError('Exception of computing a random value: argument function is not array');
    }

    var idx = getRandomInt(0, array.length - 1);
    var val = array[idx];
    if (array.length > 0) {
      array.splice(idx, 1);
    }

    return val;
  };

  var createMapPins = function (announMax) {
    var numbers = [];
    for (var i = 0; i < announMax; i++) {
      numbers.push(i + 1);
    }

    var titles = [
      'Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
      'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'
    ];

    var types = [
      'flat', 'house', 'bungalo'
    ];

    var features = [
      'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'
    ];

    var getRandomAvatar = function () {
      return 'img/avatars/user0' + getRandomValueFromArray(numbers) + '.png';
    };

    var getRandomTitle = function () {
      return getRandomValueFromArray(titles);
    };

    var getType = function () {
      return types[getRandomInt(0, types.length - 1)];
    };

    var getFeature = function () {
      var arr = [];

      var featuresCopy = features.slice();
      var rand = getRandomInt(0, features.length - 1);
      for (var k = 0; k < rand; k++) {
        arr.push(getRandomValueFromArray(featuresCopy));
      }

      return arr;
    };

    var mapPins = [];
    for (var j = 0; j < announMax; j++) {
      var locationX = getRandomInt(300, 900);
      var locationY = getRandomInt(100, 500);
      var rooms = getRandomInt(1, 5);
      mapPins.push({
        'author': {
          'avatar': getRandomAvatar()
        },
        'offer': {
          'title': getRandomTitle(),
          'address': locationX + ', ' + locationY,
          'price': getRandomInt(1000, 1000000),
          'type': getType(),
          'rooms': rooms,
          'guests': getRandomInt(rooms, rooms * 2),
          'checkin': getRandomInt(12, 14) + ':00',
          'checkout': getRandomInt(12, 14) + ':00',
          'features': getFeature(),
          'description': '',
          'photos': []
        },
        'location': {
          'x': locationX,
          'y': locationY
        }
      });
    }

    return mapPins;
  };

  var renderMapPins = function (mapPins) {
    var frag = document.createDocumentFragment();

    for (var i = 0; i < mapPins.length; i++) {
      var pin = mapPins[i];
      var locationX = pin.location.x - 46 / 2;
      var locationY = pin.location.y - 64;
      var avatar = pin.author.avatar;

      var pinElem = document.createElement('div');
      pinElem.innerHTML =
        '<button style="left: ' + locationX + 'px; top: ' + locationY + 'px;" class="map__pin">' +
        '<img src="' + avatar + '" width="40" height="40" draggable="false">' +
        '</button>';

      frag.appendChild(pinElem);
    }

    document.querySelector('.map__pins').appendChild(frag);
  };

  var renderMapCard = function (pin) {
    var mapCardTemplate = document.querySelector('template');
    var mapCard = mapCardTemplate.content.cloneNode(true);
    var offer = pin.offer;

    mapCard.querySelector('.popup__avatar').setAttribute('src', pin.avatar);
    mapCard.querySelector('h3').textContent = offer.title;
    mapCard.querySelector('p > small').textContent = offer.address;
    mapCard.querySelector('.popup__price').innerHTML = offer.price + '&#x20bd;/ночь';
    mapCard.querySelector('ul + p').textContent = offer.description;
    mapCard.querySelector('.popup__avatar').setAttribute('src', pin.author.avatar);
    mapCard.querySelector('h4 + p').textContent =
      offer.rooms + ' для ' + offer.guests + ' гостей';
    mapCard.querySelector('h4 + p + p').textContent =
      'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

    // Заполнение типа жилья
    var pinTypes = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом'
    };
    mapCard.querySelector('h4').textContent = pinTypes[offer.type];

    // Заполнение удобств в квартире
    var featuresElem = mapCard.querySelector('.popup__features');
    while (featuresElem.children.length) {
      featuresElem.removeChild(featuresElem.lastElementChild);
    }
    for (var i = 0; i < offer.features.length; i++) {
      var featureElem = document.createElement('li');
      featureElem.className = 'feature feature--' + offer.features[i];
      featuresElem.appendChild(featureElem);
    }

    var mapFiltersContainer = document.querySelector('.map__filters-container');
    document.querySelector('.map').insertBefore(mapCard, mapFiltersContainer);
  };

  var removeClass = function (selector, className) {
    var elem = document.querySelector(selector);
    if (elem !== null) {
      elem.classList.remove(className);
    }
  };

  var removeAttribute = function (selector, attribute) {
    var elem = document.querySelector(selector);
    if (elem) {
      elem.removeAttribute(attribute);
    }
  };

  var removeAttributeAll = function (selector, attribute) {
    var elems = document.querySelectorAll(selector);
    for (var i = 0; i < elems.length; i++) {
      elems[i].removeAttribute(attribute);
    }
  };

  var mapPinElem = document.querySelector('.map__pin--main');
  mapPinElem.addEventListener('mouseup', function () {
    removeClass('.map', 'map--faded');
    removeClass('.map__filters', 'notice__form--disabled');
    removeAttributeAll('.map__filter', 'disabled');
    removeAttribute('.map__filter-set', 'disabled');

    var mapPins = createMapPins(8);
    renderMapPins(mapPins);
    renderMapCard(mapPins[0]);
  });
})();
