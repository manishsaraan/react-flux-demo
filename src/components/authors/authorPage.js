'use strict';
var React = require('react');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var AuthorList = require('./authorList');
var Link = require('react-router').Link;

var  Authors = React.createClass({
	  getInitialState: function(){
	  	 return {
	  	 	authors : AuthorStore.getAllAuthors()
	  	 };
	  },
	  componentWillMount : function(){
	  	 AuthorStore.addChangeListener(this._onChange);
	  },
	  //clean up when this component unmount
	  componentWillUnmount : function(){
         AuthorStore.removeChangeListener(this._onChange);
	  },
	  _onChange : function(){
         this.setState({
         	 authors : AuthorStore.getAllAuthors()
         });
	  },
	  render() {
        return(
               <div>
                   <h1>Authors List</h1>  
                   <Link to="addAuthor" className="btn btn-default">Add Author</Link>
                   <AuthorList authors={this.state.authors} />               
               </div>
      	 	);
      }
});

module.exports = Authors;