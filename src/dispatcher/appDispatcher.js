// a singleton which operator as central hub for app updateds.
var Dispatcher = require('flux').Dispatcher;
module.exports = new Dispatcher();