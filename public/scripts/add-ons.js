var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TodoList = React.createClass({
  getInitialState: function() {
    return {items: ['hello', 'world', 'click', 'me']};
  },
  handleAdd: function() {
    console.log('addd');
    var newItems =
      this.state.items.concat([prompt('Enter some text')]);
    this.setState({items: newItems});
  },
  handleRemove: function(i) {
    console.log('delete');
    var newItems = this.state.items;
    newItems.splice(i, 1);
    this.setState({items: newItems});
    // this.forceUpdate();
  },
  render: function() {
    console.log('render ' + this.state.items.length);
    var items = this.state.items.map(function(item, i) {
      return (
        <div key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </div>
      );
    }.bind(this));
    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        {items}

      </div>
    );
  }
});

var ReactCSSTransitionGroup2 = React.addons.CSSTransitionGroup;

var ImageCarousel = React.createClass({
  propTypes: {
    imageSrc: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div>
        <ReactCSSTransitionGroup2 transitionName="carousel">
          <img src={this.props.imageSrc} key={this.props.imageSrc} />
        </ReactCSSTransitionGroup2>
      </div>
    );
  }
});

var NoLink = React.createClass({
  getInitialState: function() {
    return {message: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({message: event.target.value});
  },
  render: function() {
    var message = this.state.message;
    return <input type="text" value={message} onChange={this.handleChange} />;
  }
});

React.render(
  // <TodoList />
  <NoLink />,
  // <ImageCarousel imageSrc={'images/b1.jpg'} />,
  document.getElementById('content')
);