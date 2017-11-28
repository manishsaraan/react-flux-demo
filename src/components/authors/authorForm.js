'use strict';
var React = require('react');

var AuthorForm  = React.createClass({
	render : function(){
		return(
			<div>
              <form>
                <h1>Manage Author</h1>
                <lable htmlFor="firstName">First Name </lable>
                <input type="text" name="firstName" className="form-control" placeholder="First Name" ref="firstName" 
                value={this.props.author.firstName} onChange= {this.props.onChange}/>
                <br/>
                <lable htmlFor="lastName">Last Name </lable>
                <input type="text" name="lastName" className="form-control" placeholder="Last Name" ref="lastName" 
                value={this.props.author.lastName} onChange= {this.props.onChange} />
                <br/>
                <input type="submit" value="save" className="btn btn-default" />
              </form>
            </div>
			);
	}
});

module.exports = AuthorForm;