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
function createMarkup() { return {__html: 'First &middot; Second'}; };

var App = React.createClass({
  componentDidMount: function() {
    // This doesn't refer to the `span`s! It refers to the children between
    // last line's `<App></App>`, which are undefined.
    console.log(this.props.children);
  },

  render: function() {

   return <div dangerouslySetInnerHTML={createMarkup()} />
    return <div><span/><span/></div>;
  }
});


React.renderComponent(<App><a></a></App>, document.getElementById('example'));