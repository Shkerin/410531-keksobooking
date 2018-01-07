'use strict';

/**
 * Модуль для взаимодействия с удалённым севером через XHR
 */

(function () {
  var consts = window.consts;

  var createHttpRequest = function (loadHandler, errorHandler, errorMsg) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = consts.RESPONSE_TYPE;
    xhr.timeout = consts.TIMEOUT;

    xhr.addEventListener('load', function () {
      loadHandler(xhr.response);
    });
    xhr.addEventListener('error', function () {
      errorHandler(errorMsg);
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    return xhr;
  };

  var load = function (loadHandler, errorHandler) {
    var errorMsg = 'Произошла ошибка при получении данных';
    var xhr = createHttpRequest(loadHandler, errorHandler, errorMsg);

    xhr.open('GET', consts.URL_LOAD);
    xhr.send();
  };

  var upload = function (data, loadHandler, errorHandler) {
    var errorMsg = 'Произошла ошибка при отправке данных';
    var xhr = createHttpRequest(loadHandler, errorHandler, errorMsg);

    xhr.open('POST', consts.URL_UPLOAD);
    xhr.send(data);
  };

  var hostReachable = function () {
    var xhr = new XMLHttpRequest();

    // Open new request as a HEAD to the root hostname with a random param to bust the cache
    xhr.open('HEAD', '//' + window.location.hostname + '/?rand=' + Math.floor((1 + Math.random()) * 0x10000), false);

    // Issue request and handle response
    try {
      xhr.send();
      return (xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304));
    } catch (error) {
      return false;
    }
  };

  window.backend = {
    loadData: load,
    saveDate: upload,
    hostReachable: hostReachable
  };
})();
