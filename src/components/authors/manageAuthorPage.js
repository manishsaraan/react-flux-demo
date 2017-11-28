'use strict';
var React = require('react');
var AuthorForm = require('./authorForm');
var AuthorApi = require('../../api/authorApi');
var Router = require('react-router');

var MangeAuthorPage = React.createClass({
	mixins : [
       Router.Navigation
	],
	getInitialState : function(){
		return  { author : { id : '', firstName : '', lastName : ''} };
	},
	setAuthorState : function(){
		var field  = event.target.name;
		var value  = event.target.value;
		this.state.author[field] = value;
		return this.setState({
			author : this.state.author
		});
	},
	saveAuthor :  function(event){
		event.preventDefault();
        AuthorApi.saveAuthor(this.state.author);
        this.transitionTo('authors');
	},
	 render(){
	 	return(
                <div>                   
                   <AuthorForm
                       author = {this.state.author}
                       onChange = {this.setAuthorState}
                       onSave = {this.saveAuthor}
                   />
                </div>
	 		);
	 }
});

module.exports = MangeAuthorPage;