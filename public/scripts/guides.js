var CheckLink = React.createClass({
  render: function() {
    // This takes any props passed to CheckLink and copies them to <a>
    return <a {...this.props}>{'√ '}{this.props.children}</a>;
  }
});
//tabIndex="1"
//style="padding: 10"
var divStyle = {
  color: 'red'
};
React.render(
  <CheckLink href="/checked.html" className="dd ss" tabIndex="1" style={divStyle} >
    Click here!
  </CheckLink>,
  document.getElementById('example')
);