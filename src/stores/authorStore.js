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
         case  action.actionType.CREATE_AUTHOR :
                _authors.push(action.author);
                AuthorStore.emitChange();
	}
});
module.exports = AuthorStore;