var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.username}'s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

React.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.getElementById('content')
);

// -----------------------------------------
var TodoList = React.createClass({
  getInitialState: function() {
    return {
      id: '0',
      title: '',
      done: false,
      created_at: '',
      updated_at: ''
    };
  },

  componentDidMount: function() {
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: this.props.source,
        crossDomain : true
    })
      .done(function( result ) {
          console.log("done");

          var lastGist = result[0];
          if (this.isMounted()) {
            this.setState({
              id: lastGist.id,
              title: lastGist.title,
              done: lastGist.done,
              created_at: lastGist.created_at,
              updated_at: lastGist.updated_at
            });
          }
      }.bind(this))
      .fail( function(xhr, textStatus, errorThrown) {
          alert(xhr.responseText);
          alert(textStatus);
      });
    /*
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          id: lastGist.id,
          title: lastGist.title,
          done: lastGist.done,
          created_at: lastGist.created_at,
          updated_at: lastGist.updated_at
        });
      }
    }.bind(this), 'jsonp');*/
  },

  render: function() {
    return (
      <div>
        {this.state.title}'s last gist is
        {this.state.created_at} - {this.state.updated_at}
      </div>
    );
  }
});

React.render(
  <TodoList source="http://192.168.21.90:8000/api/todos" />,
  document.getElementById('example')
);

// ---------------------------------------
var Filters = React.createClass({
  handleFilterChange: function() {
    var value = this.refs.filterInput.getDOMNode().value;
    this.props.updateFilter(value);
  },
  render: function() {
    return <input type="text" ref="filterInput" onChange={this.handleFilterChange} placeholder="Filter" />;
  }
});

var List = React.createClass({
  render: function() {
    var content;
    if (this.props.items.length > 0) {
      var items = this.props.items.map(function(item) {
        return <li>{item}</li>;
      });
      content = <ul>{items}</ul>
    } else {
      content = <p>No items matching this filter</p>;
    }
    return (
      <div className="results">
        <h4>Results</h4>
        {content}
      </div>
    );
  }
});

var ListContainer = React.createClass({
  getInitialState: function() {
    return {
      listItems: ['Chicago', 'New York', 'Tokyo', 'London', 'San Francisco', 'Amsterdam', 'Hong Kong'],
      nameFilter: ''
    };
  },
  handleFilterUpdate: function(filterValue) {
    this.setState({
      nameFilter: filterValue
    });
  },
  render: function() {
    var displayedItems = this.state.listItems.filter(function(item) {
      if (this.state.nameFilter == '') return true;
      
      var match = item.toLowerCase().indexOf(this.state.nameFilter.toLowerCase());
      return (match !== -1);
    }.bind(this));

    return (
      <div>
        <Filters updateFilter={this.handleFilterUpdate} />
        <List items={displayedItems} />
      </div>
    );
  }
});

React.renderComponent(<ListContainer />, document.getElementById('example'));