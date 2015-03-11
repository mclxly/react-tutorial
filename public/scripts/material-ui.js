/** MyAwesomeReactComponent.jsx */
//  browserify -t reactify material-ui.js > demo-material-ui.js
var React = require('react'),
  mui = require('material-ui'),
  RaisedButton = mui.RaisedButton;
var FlatButton = mui.FlatButton;
var DatePicker = mui.DatePicker;

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var MyAwesomeReactComponent = React.createClass({
 
  render: function() {
    return (
      <div>
        <RaisedButton label="Default" />
        <FlatButton label="Primary" primary={true} />
        //Portrait Dialog
        <DatePicker
          hintText="Portrait Dialog" />

        //Landscape Dialog
        <DatePicker
          hintText="Landscape Dialog"
          mode="landscape" />
      </div>
    );
  }
 
});

React.render(
  <MyAwesomeReactComponent />,
  document.getElementById('content')
)
 
module.exports = MyAwesomeReactComponent;