'use strict';
var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var actionTypes = require('../constants/actionTypes');

var AuthorActions = {
	createAuthor : function(author){		
        var newAuthor = AuthorApi.saveAuthor(author);

        Dispatcher.dispatch({
            actionType : actionTypes.CREATE_AUTHOR,
            data : {
        		author : newAuthor
        	} 
        });
	},
	updateAuthor : function(author){		
        var updatedAuthor = AuthorApi.saveAuthor(author);

        Dispatcher.dispatch({
            actionType : actionTypes.UPDATE_AUTHOR,
            data : {
        		author : updatedAuthor
        	} 
        });
	}

};
module.exports = AuthorActions;