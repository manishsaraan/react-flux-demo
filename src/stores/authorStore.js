'use strict';
var Distpather = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/ActionTypes');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _authors = [];

var assign = require('object-assign');
var AuthorStore = assign({}, EventEmitter.prototype, {
       addChangeListener: function(callback){
          this.on(CHANGE_EVENT, callback);
       },

       removeChangeListener : function(callback){
       	this.removeListener(CHANGE_EVENT, callback);
       },

       emitChange : function(){
       	this.emit(CHANGE_EVENT);
       },

       getAllAuthors : function(){       
       	return _authors;
       },

       getAuthorById : function(id){
       	return _.find(_authors, {id : id}); 
       }
});

Distpather.register(function(action){
	switch(action.actionType){
         case  ActionTypes.INITIALIZE : 
               _authors = action.initialData.authors;
               AuthorStore.emitChange();
               break;

         case  ActionTypes.CREATE_AUTHOR :               
                _authors.push(action.data.author);
                AuthorStore.emitChange();
                break;

         case  ActionTypes.UPDATE_AUTHOR :               
                var existingAuthor = _.find(_authors, {id : action.data.author.id});
                var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
                _authors.splice(existingAuthorIndex, 1, action.data.author);
                AuthorStore.emitChange();
                break;
         default : 
         //no need
	}
});
module.exports = AuthorStore;