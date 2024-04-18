"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var axios = require('axios');

var _require = require('ws'),
    errorMonitor = _require.errorMonitor;

var serverPort = 3000;

function loginToServer(data) {
  var response;
  return regeneratorRuntime.async(function loginToServer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          response = "";

          _readOnlyError("response");

          _context.next = 4;
          return regeneratorRuntime.awrap(axios.post('http://localhost:' + serverPort + '/login', data));

        case 4:
          response = _context.sent;
          console.log("odpowidź od serwera: " + response.data);
          console.log(response.data.conectionID);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

function sendDataToServer(data) {
  var response;
  return regeneratorRuntime.async(function sendDataToServer$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log('http://localhost:' + serverPort + '/createAcount');
          response = "";

          _readOnlyError("response");

          _context2.next = 6;
          return regeneratorRuntime.awrap(axios.post('http://localhost:' + serverPort + '/login', data));

        case 6:
          response = _context2.sent;
          console.log("odpowidź od serwera: " + response.data);
          console.log(response.data.conectionID); // response = await axios.post('http://localhost:'+serverPort+'/server',data);
          // console.log("odpowidź od serwera: "+ response.data);
          // console.log(response.data.conectionID);

          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.error("Błąd podczas wysyłania danych: " + _context2.t0);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

clientDataToSave = {
  "ID": "1",
  "conectionID": 1,
  "data": {
    "id": "1",
    "name": "aaaa",
    "player1": "bbb",
    "player2": "ccc",
    "moves": ["a1", "a2", "a3", "a4", "a5", "a6", "a7"],
    "player1Time": 10,
    "player2Time": 11
  }
};
data = {
  "id": "1",
  "name": "aaaa",
  "player1": "bbb",
  "player2": "ccc",
  "moves": ["a1", "a2", "a3", "a4", "a5", "a6", "a7"],
  "player1Time": 10,
  "player2Time": 11
};
loginData = {
  "name": "Name1",
  "login": "login1",
  "password": "1234"
};
loginToServer(loginData); // sendDataToServer(clientDataToSave);

sendDataToServer(clientDataToSave);