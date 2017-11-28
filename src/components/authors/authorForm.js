'use strict';
var React = require('react');
var Input = require('../common/textInput');

var AuthorForm  = React.createClass({
	render : function(){
		return(
			<div>
              <form>
                <h1>Manage Author</h1>
                <Input 
                    name = "firstName"
                    label = "First Name"
                    placeholder = "First Name"
                    value={this.props.author.firstName}
                    onChange= {this.props.onChange}
                 />                
                <br/>
                 <Input 
                    name = "lastName"
                    label = "Last Name"
                    placeholder = "Last Name"
                    value={this.props.author.lastName}
                    onChange= {this.props.onChange}
                 />              
                <br/>
                <input type="submit" value="save" className="btn btn-default" />
              </form>
            </div>
			);
	}
});

module.exports = AuthorForm;