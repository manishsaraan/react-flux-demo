'use strict';
var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var actionTypes = require('../constants/actionTypes');

var initializeActions = {
     initApp : function(){
     	 Dispatcher.dispatch({
     	 	 actionType : actionTypes.INITIALIZE,
     	 	 initialData : {
     	 	 	authors : AuthorApi.getAllAuthors()
     	 	 }
     	 })
     }
};
module.exports = initializeActions;