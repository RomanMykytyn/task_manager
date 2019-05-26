class App extends React.Component {
  constructor() {
    super();
    this.state = {
        name: cookieValue,
        select: "",
        data: [],
    };
  }

  componentDidMount() {
    const socket = new WebSocket('ws://localhost:3000');
    socket.addEventListener('open', function (event) {
      socket.send('Hello Server!');
    });
    socket.addEventListener('message', function (event) {
      console.log('Message from server', event.data);
    });
  }

  render() {
    return (<div>
              <Header username={this.state.name}/>
            </div>);
  }
}

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
        name: "",
        select: "",
        data: [],
    };
  }

  componentDidMount() {
  }

  render() {
    return (<div>
              <nav className="header">
                <ul>
                  <li><span id='hello'>Hello: {this.props.username}.</span></li>
                  <li><span id='exit'>Exit</span></li>
                </ul>
              </nav>
            </div>);
  }
}

var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)nameCurrentUser\s*\=\s*([^;]*).*$)|^.*$/, "$1");
function alertCookieValue() {
  alert(cookieValue);
}

alertCookieValue();

ReactDOM.render(<App />, document.getElementById("root"));
