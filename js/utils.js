'use strict';

/**
 * Модуль для вспомогательных функций
 */

(function () {
  var consts = window.consts;

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === consts.ESC_KEYCODE) {
        action(evt);
      }
    },

    isContains: function (array, elem) {
      return array.indexOf(elem) !== -1;
    },

    isNumeric: function (num) {
      return !isNaN(parseFloat(num)) && isFinite(num);
    },

    getRandomInt: function () {
      if (arguments.length === 1) {
        return this._getRandomIntMinMax(0, arguments[0]);
      }
      return this._getRandomIntMinMax(arguments[0], arguments[1]);
    },

    _getRandomIntMinMax: function (min, max) {
      if (!this.isNumeric(min) || !this.isNumeric(max)) {
        throw new TypeError('Exception of computing a random number: min or max is not numeric');
      } else if (min > max) {
        throw new RangeError('Exception of computing a random number: min > max');
      } else if (min === max) {
        return min;
      }

      var rand = Math.random() * (max - min + 1);
      return Math.floor(rand) + min;
    },

    addAttributeAll: function (target, attribute) {
      var elems = document.querySelectorAll(target);
      [].forEach.call(elems, function (elem) {
        elem.setAttribute(attribute, attribute);
      });
    },

    removeAttributeAll: function (target, attribute) {
      var elems = document.querySelectorAll(target);
      [].forEach.call(elems, function (elem) {
        elem.removeAttribute(attribute, attribute);
      });
    }
  };
})();
