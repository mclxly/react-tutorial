/** MyAwesomeReactComponent.jsx */
 
var React = require('react'),
  mui = require('material-ui'),
  RaisedButton = mui.RaisedButton;
 
var MyAwesomeReactComponent = React.createClass({
 
  render: function() {
    return (
      <RaisedButton label="Default" />
    );
  }
 
});
 
module.exports = MyAwesomeReactComponent;