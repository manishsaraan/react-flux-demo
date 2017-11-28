'use strict';
var React = require('react');
var AuthorForm = require('./authorForm');
var MangeAuthorPage = React.createClass({
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
	 render(){
	 	return(
                <div>                   
                   <AuthorForm
                       author = {this.state.author}
                       onChange = {this.setAuthorState}
                   />
                </div>
	 		);
	 }
});

module.exports = MangeAuthorPage;