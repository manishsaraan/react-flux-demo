'use strict';
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Home = React.createClass({
    render(){
    	return(
               <div className="jumbotron">
                  <h1>Pluralsight Administration Home</h1>
                  <p>React, React Router, and Flux for ultra responsive web apps.</p>
                  <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
               </div>
    		);
    }
});

module.exports = Home;