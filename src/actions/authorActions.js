'use strict';
var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var actionTypes = require('../constants/actionTypes');

var AuthorActions = {
	createAuthor : function(author){
        var newAuthor = AuthorApi.saveAuthor(author);

        //hey dispatcher tell all the stores that an author created
        Dispatcher.dispatch({
        	actionType : actionTypes.CREATE_AUTHOR,
        	data : newAuthor
        });
	}
};
module.exports = AuthorActions;