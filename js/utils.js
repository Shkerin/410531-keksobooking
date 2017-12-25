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
      } else if (arguments.length === 2) {
        return this._getRandomIntMinMax(arguments[0], arguments[1]);
      } else {
        throw new TypeError('Exception of computing a random value: invalid number of arguments');
      }
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
      if (typeof target === 'string') {
        var elems = document.querySelectorAll(target);
        if (elems !== null) {
          for (var i = 0; i < elems.length; i++) {
            elems[i].setAttribute(attribute, attribute);
          }
        }
      } else {
        throw new TypeError('Exception add attribute all: target is not valid type');
      }
    },

    removeAttributeAll: function (target, attribute) {
      if (typeof target === 'string') {
        var elems = document.querySelectorAll(target);
        if (elems !== null) {
          for (var i = 0; i < elems.length; i++) {
            elems[i].removeAttribute(attribute);
          }
        }
      } else {
        throw new TypeError('Exception remove attribute all: target is not valid type');
      }
    }
  };
})();
