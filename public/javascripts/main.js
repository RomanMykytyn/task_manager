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
        modalIsOpen: false,
        name: "",
        select: "",
        data: [],
    };
    this.viewModal = this.viewModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
  }

  viewModal() {
    this.setState({ modalIsOpen: true });
  }

  hideModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (<div>
              { this.state.modalIsOpen ? <ModalForm closeForm={this.hideModal} /> : null }
              <nav className="header">
                <ul>
                  <li><span id='hello'>Hello, {this.props.username}.</span></li>
                  <li><span id='addTask' onClick={this.viewModal}>Add Task</span></li>
                  <li><span id='exit' onClick={exitUser}>Exit</span></li>
                </ul>
              </nav>
            </div>);
  }
}

class ModalForm extends React.Component {
  constructor() {
    super();
    this.state = {
        modalIsOpen: false,
        name: "",
        select: "",
        data: [],
    };
  }

  componentDidMount() {
    socket.send('Hello Form!');
  }

  render() {
    return (
      <div className="modalbackground">
      <div className='box'>
        <h1>{this.props.isEdit ? 'Edit Task.' : 'Add Task.'}</h1>
        <label htmlFor="title_field">Title:</label><br />
        <input type="text" name="title" id="title_field" className="title"/><br /><br />
        <label htmlFor="select_field">Select users:</label><br />
        <select name="select" id="select_field" className="select"></select><br /><br />
        <label htmlFor="textarea_field">Description:</label><br />
        <textarea id="textarea_field" rows="4" cols="40" maxLength="150" className="textarea"></textarea><br /><br />
        <input type="button" value="Add" name="type_button" className="btn"/>
        <input type="button" value="Close" name="type_button" className="btn2" onClick={this.props.closeForm}/>
      </div>
      </div>
    );
  }
}


var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)nameCurrentUser\s*\=\s*([^;]*).*$)|^.*$/, "$1");

function exitUser() {
  fetch('/exit', {credentials: 'include', method: 'GET'})
  .then(function(response){if (response.redirected) {console.log('fas'); document.location.reload()}});
}

const socket = new WebSocket('ws://localhost:3000');
socket.addEventListener('open', function (event) {
  socket.send('Hello Server!');
});
socket.addEventListener('message', function (event) {
  console.log('Message from server', event.data);
});

ReactDOM.render(<App />, document.getElementById("root"));
