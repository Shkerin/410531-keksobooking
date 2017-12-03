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
    var num = array[idx];
    if (array.length > 0) {
      array.splice(idx, 1);
    }

    return num;
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

      var rand = getRandomInt(0, features.length - 1);
      for (i = 0; i < rand; i++) {
        arr.push(features[getRandomInt(0, features.length - 1)]);
      }

      return arr;
    };

    var mapPins = [];
    for (i = 0; i < announMax; i++) {
      var locationX = getRandomInt(300, 900);
      var locationY = getRandomInt(100, 500);
      var rooms = getRandomInt(1, 5);
      mapPins.push({
        'author': {
          'avatar': getRandomAvatar()
        },
        'offer': {
          'title': getRandomTitle(),
          'address': locationX + ' ' + locationY,
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
      var locationX = mapPins[i].location.x;
      var locationY = mapPins[i].location.y;
      var avatar = mapPins[i].author.avatar;

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

    mapCard.querySelector('.popup__avatar').setAttribute('src', pin.avatar);
    mapCard.querySelector('h3').textContent = pin.offer.title;
    mapCard.querySelector('p > small').textContent = pin.offer.address;
    mapCard.querySelector('.popup__price').innerHTML = pin.offer.price + '&#x20bd;/ночь';
    mapCard.querySelector('ul + p').textContent = pin.offer.description;
    mapCard.querySelector('.popup__avatar').setAttribute('src', pin.author.avatar);
    mapCard.querySelector('h4 + p').textContent =
      pin.offer.rooms + ' для ' + pin.offer.guests + ' гостей';
    mapCard.querySelector('h4 + p + p').textContent =
      'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;

    // Заполнение типа жилья
    var typeElem = mapCard.querySelector('h4');
    switch (pin.offer.type) {
      case 'flat':
        typeElem.textContent = 'Квартира';
        break;
      case 'bungalo':
        typeElem.textContent = 'Бунгало';
        break;
      case 'house':
        typeElem.textContent = 'Дом';
    }

    // Заполнение удобств в квартире
    var featuresElem = mapCard.querySelector('.popup__features');
    while (featuresElem.children.length) {
      featuresElem.removeChild(featuresElem.lastElementChild);
    }
    for (var i = 0; i < pin.offer.features.length; i++) {
      var featureElem = document.createElement('li');
      featureElem.className = 'feature feature--' + pin.offer.features[i];
      featuresElem.appendChild(featureElem);
    }

    var mapFiltersContainer = document.querySelector('.map__filters-container');
    document.querySelector('.map').insertBefore(mapCard, mapFiltersContainer);
  };

  var removeClass = function (selector, className) {
    var el = document.querySelector(selector);
    if (el !== null) {
      el.classList.remove(className);
    }
  };

  removeClass('.map', 'map--faded');

  var mapPins = createMapPins(8);
  renderMapPins(mapPins);
  renderMapCard(mapPins[0]);
})();
