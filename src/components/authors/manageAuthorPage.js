'use strict';
var React = require('react');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var Router = require('react-router');
var toastr = require('toastr');

var MangeAuthorPage = React.createClass({
	mixins : [
       Router.Navigation
	],
	statics : {
		willTransitionFrom : function(transition, component){
           if(component.state.dirty && !confirm('Leave without saving?')){
           	  transition.abort();
           }
		}
	},
	getInitialState : function(){
		return  { author : { id : '', firstName : '', lastName : ''},
		          errors : {},
		          dirty : false

		  };
	},
	componentWillMount : function(){
		var authorId = this.props.params.id; //from the path id
		if(authorId){
			this.setState({
				author : AuthorStore.getAuthorById(authorId)
			});
		}
	},
	setAuthorState : function(){
		this.setState({
			dirty : true
		});
		var field  = event.target.name;
		var value  = event.target.value;
		this.state.author[field] = value;
		return this.setState({
			author : this.state.author
		});
	},
	authorFormValidate : function(){
		var formIsValid = true;
		this.state.errors = {}; //clear previous errors
        if(this.state.author.firstName.length < 3){
        	this.state.errors.firstName = "First Name must be min 3 letters"; 
        	formIsValid = false;
        }
        if(this.state.author.lastName.length < 3){
        	this.state.errors.lastName = "Last Name must be min 3 letters"; 
        	formIsValid = false;
        }
        this.setState({
        	errors : this.state.errors
        });
        return formIsValid;
	},
	saveAuthor :  function(event){
		event.preventDefault();

		//validate input
		if(!this.authorFormValidate()){
			return;
		}

		if(this.state.author.id){
           AuthorActions.updateAuthor(this.state.author);
		}   
		else{
	       AuthorActions.createAuthor(this.state.author);	
		}   
        
        toastr.success('Author Saved.');
        this.setState({dirty : false});
        this.transitionTo('authors');
	},
	 render(){
	 	return(
                <div>                   
                   <AuthorForm
                       author = {this.state.author}
                       onChange = {this.setAuthorState}
                       onSave = {this.saveAuthor}
                       errors = {this.state.errors}
                   />
                </div>
	 		);
	 }
});

module.exports = MangeAuthorPage;