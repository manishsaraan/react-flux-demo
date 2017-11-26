'use strict';
var React = require('react');
var Link = require('react-router').Link;

var NotFoundPage = React.createClass({
	render : function(){
		 return (
                 <div>
                    <h1> Page Not Found.</h1>
                    <p>Whooops! Sorry there is noting to see here</p>
                    <p><Link to="app">Back To Home</Link></p>
                 </div>
		 	);
	}
});

module.exports  = NotFoundPage;