"use strict";

var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult;

var bcrypt = require('bcrypt');

var http = require('http');

var _require2 = require('webpack'),
    validate = _require2.validate;

var MongodbPort = 27017;
var ServerPort = 3000;
var app = express();
var mongodbloginToAcountSchema = new mongoose.Schema({
  login: Number,
  pasword: String
});
var mongodbSchema = new mongoose.Schema({
  ID: Number,
  conectionID: Number,
  data: Object // [mongoose.Schema.Types.Array]// error array jest zły

});
var UserSchema = new mongoose.Schema({
  ID: Number,
  userName: Number,
  port: Number,
  lastLogin: Date
});
var User = mongoose.model('User', UserSchema);
var ServerConection = mongoose.model('ServerConection', mongodbloginToAcountSchema);
var dataFormUser = new mongoose.model('Data', UserSchema);
app.use(bodyParser.json()); // Server client 
// Włączenie serwera

app.listen(ServerPort, function () {
  console.log("Włączenie serweru.");
  console.log("Nasłuchiwanie");
});
app.post('/login', function _callee(req, res) {
  var dataBase, collection, user, match;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // await client.connect();
          dataBase = ServerConection.db(Chess);
          collection = dataBase.collection('Users');
          _context.next = 5;
          return regeneratorRuntime.awrap(collection.findOne({
            username: username
          }));

        case 5:
          user = _context.sent;

          if (!user) {
            _context.next = 13;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 9:
          match = _context.sent;

          if (match) {
            console.log("Login successful");
          } else {
            console.log("Error in login or password.");
          }

          _context.next = 14;
          break;

        case 13:
          console.log("User not found");

        case 14:
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).send("ERROR in login.");

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
}); // app.post('/login', (req, res) =>{
// if (err) {
//     res.status(500).send("ERROR in login.")
// }else if(User){
//     User.port = port;
//     User.lastLogin = new Date();
//     User.save();
//     res.send("You have login ."); 
// }else{
//     const newUser = new User({id : 0,userName,port, lastLogin : new Date()});
//     newUser.save(err => {
//         if(err){
//         res.status(500).send("Error in creating user");
//         }  else{
//             res.send("create");
//         }
//     });
// }
// });
// End point który pobiera dane z portu POST do serewra 

app.post('/server', body("ID").isNumeric(), body("conectionID").isNumeric(), function _callee2(req, res) {
  var error, newData, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          error = validationResult(req);

          if (error.isEmpty()) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            error: error.array()
          }));

        case 3:
          // Zapis danych do bazy
          console.log(req.body);
          newData = new dataFormUser(req.body);
          _context2.next = 7;
          return regeneratorRuntime.awrap(newData.save());

        case 7:
          result = _context2.sent;
          res.json(result);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.post('/createAcount', body("ID").isNumeric(), body("conectionID").isNumeric(), function _callee3(req, res) {
  var error;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          error = validationResult(req);

          if (error.isEmpty()) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            error: error.array()
          }));

        case 5:
          return _context3.abrupt("return", mongodbCreateUser(client, req.name, res.login, req.password));

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // wysyłanie danych do klienta GET

app.get('/server', function _callee4(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          data = new dataFormUser.find();
          res.json(data);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
});

function mongodbCreateUser(client, name, login, password) {
  var db, collection, insert, result;
  return regeneratorRuntime.async(function mongodbCreateUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          db = client.db("Chess");
          collection = db.collection('Users'); // Instert user to mongoDB

          insert = {
            name: name,
            login: login,
            password: password
          };
          _context5.next = 6;
          return regeneratorRuntime.awrap(collection.insert(insert));

        case 6:
          result = _context5.sent;
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function mongodbConect() {}

function mongodbSetData() {}

mongoose.connect('mongodb://localhost:27017/Chess', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); // const server = http.createServer(function (req, res) {
//   })