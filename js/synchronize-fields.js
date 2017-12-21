'use strict';

(function () {
  var synchronizeFields = function (elem1, elem2, obj1, obj2, callback) {

    var changeHandler = function (evt) {
      var target = evt.target;
      if (target === elem1) {
        callback(elem2, obj2[target.selectedIndex]);
      } else {
        callback(elem1, obj1[target.selectedIndex]);
      }
    };

    elem1.addEventListener('change', changeHandler);
    elem2.addEventListener('change', changeHandler);
  };

  window.synchronizeFields = synchronizeFields;
})();
