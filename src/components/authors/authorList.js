'use strict';
var React = require('react');
var Link = require('react-router').Link;

var  AuthorList = React.createClass({
     propTypes : {
          authors : React.PropTypes.array.isRequired
     },
	   render() {
      	 var createAuthorRow = function(author){          
             return (
                  <tr key = {author.id}>
                  	 <td>
                         <Link to="manageAuthor" params={{id : author.id || '0' }}>{author.id || '0' }</Link>
                     </td>
                  	 <td>{author.firstName + ' ' +author.lastName}</td>
                  </tr>
             	);
      	 }
      	 return(
               <div>
                   
                   <table className="table">
                     <thead>
                     	<th>Id</th>
                     	<th>Name</th>
                     </thead>
                     <tbody>
                     	{this.props.authors.map(createAuthorRow, this)}
                     </tbody>
                   </table>
               </div>
      	 	);
      }
});

module.exports = AuthorList;