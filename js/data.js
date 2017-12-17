'use strict';

/**
 * Модуль для создания данных
 */

(function () {
  var utils = window.utils;

  window.data = {
    createMapPins: function (numPins) {
      var numbers = [];
      for (var i = 0; i < numPins; i++) {
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
        return 'img/avatars/user0' + utils.getRandomValueFromArray(numbers) + '.png';
      };

      var getRandomTitle = function () {
        return utils.getRandomValueFromArray(titles);
      };

      var getType = function () {
        return types[utils.getRandomInt(0, types.length - 1)];
      };

      var getFeature = function () {
        var arr = [];

        var featuresCopy = features.slice();
        var rand = utils.getRandomInt(features.length - 1);
        for (var k = 0; k < rand; k++) {
          arr.push(utils.getRandomValueFromArray(featuresCopy));
        }

        return arr;
      };

      var mapPins = [];
      for (var j = 0; j < numPins; j++) {
        var locationX = utils.getRandomInt(300, 900);
        var locationY = utils.getRandomInt(100, 500);
        var rooms = utils.getRandomInt(1, 5);
        mapPins.push({
          'uid': j, // TODO replace to uid
          'author': {
            'avatar': getRandomAvatar()
          },
          'offer': {
            'title': getRandomTitle(),
            'address': locationX + ', ' + locationY,
            'price': utils.getRandomInt(1000, 1000000),
            'type': getType(),
            'rooms': rooms,
            'guests': utils.getRandomInt(rooms, rooms * 2),
            'checkin': utils.getRandomInt(12, 14) + ':00',
            'checkout': utils.getRandomInt(12, 14) + ':00',
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
    }
  };
})();
