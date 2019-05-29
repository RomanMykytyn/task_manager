const socket = new WebSocket('ws://localhost:3000');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        modalIsOpen: false,
        name: cookieValue,
        listUsers: [],
        listTask: [],
    };
    this.viewModal = this.viewModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    socket.onopen = () => {
      console.log('connected');
      socket.send('Hello Server!');
    }

    socket.onmessage = event => {
      this.setState({ listUsers: JSON.parse(event.data).listUsers });
      this.setState({ listTask: JSON.parse(event.data).listTask });
      console.log(this.state.listUsers);
      console.log(this.state.listTask);
    }
  }

  viewModal() {
    this.setState({ modalIsOpen: true });
  }

  hideModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (<div>
              { this.state.modalIsOpen ? <ModalForm closeForm={this.hideModal} listUsers={this.state.listUsers} /> : null }
              <Header username={this.state.name}  viewModal={this.viewModal} />
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
                  <li><span id='hello'>Hello, {this.props.username}.</span></li>
                  <li><span id='addTask' onClick={this.props.viewModal}>Add Task</span></li>
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
        title: "",
        select: [],
        description: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
  }

  handleChange(event) {
    if (event.target.name !== "select") {
      this.setState({ [event.target.name]: event.target.value });
    }
    else {
      this.setState({[event.target.name]: Array.from(event.target.selectedOptions, (item) => item.value)});
    }
    console.log(this.state.title);
    console.log(this.state.select);
    console.log(this.state.description);
  }

  submitForm() {
    var title = this.state.title, forUsers = this.state.select, description = this.state.description;
    if (!title || !forUsers || !description) {
      alert("Please, enter all data!");
      return
    }
    var data = {newTask: {title: title, forUsers: forUsers, description: description}};
    socket.send(JSON.stringify(data));
  }

  render() {
    return (
      <div className="modalbackground">
      <div className='box'>
        <h1>{this.props.isEdit ? 'Edit Task.' : 'Add Task.'}</h1>
        <label htmlFor="title_field">Title:</label><br />
        <input type="text" name="title" id="title_field" className="title" onChange={this.handleChange}/><br /><br />
        <label htmlFor="select_field">Select users:</label><br />
        <select multiple size="3" name="select" id="select_field" className="select" onChange={this.handleChange}>
            {this.props.listUsers.map(el => (<option>{el.username}</option>))}</select><br /><br />
        <label htmlFor="textarea_field">Description:</label><br />
        <textarea name="description" id="textarea_field" rows="4" cols="40" maxLength="150"
            className="textarea" onChange={this.handleChange}></textarea><br /><br />
        <input type="button" value="Add" name="type_button" className="btn" onClick={this.submitForm}/>
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



ReactDOM.render(<App />, document.getElementById("root"));
