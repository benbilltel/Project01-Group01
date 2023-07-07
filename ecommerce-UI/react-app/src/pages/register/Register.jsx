import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import { setError,setMessage } from "../../redux/actions/commonAction";
import { insertUser } from "../../redux/actions/userAction";
class Register extends Component {
    constructor() {
        super();
        this.state = {
          user: {
            name: "",
            userName: "",
            password: "",
            email: "",
            phoneNumber: "",
            type: "",
          },
        };
      }
  registNewUser = (event) => {
    event.preventDefault();
    const userName = event.target.elements.userName.value;
    const password = event.target.elements.password.value;
    const passwordAgain = event.target.elements.passwordAgain.value;
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const phoneNumber = event.target.elements.phoneNumber.value;
    //validate
    if(name === ""){
        this.props.setError("Name is required!");
    }
    if(userName=== ""){
        this.props.setError("Username is required!");
    }
    if(password=== ""){
        this.props.setError("Password is required!");
    }
    if(passwordAgain=== ""){
        this.props.setError("Confirm password is required!");
    }
    if(phoneNumber=== ""){
        this.props.setError("Phone number is required!");
    }
    if (password !== passwordAgain) {
      this.props.setError("Password does not match!");
    }
    const { error} = this.props;
    
    if(error === ""){
        const { navigate} = this.props.router;
        const { user} = this.state;
        user.name = name
        user.userName = userName
        user.password = password
        user.email = email
        user.phoneNumber = phoneNumber
        user.type = "User"
        this.props.insertUser(user,navigate)
    }
  };
  renderErrorMessage = () => {
    const { error } = this.props;
    if (error) {
      return { display: "block", color: "red" };
    }
    return { display: "none" };
  };
//   componentWillUnmount=()=>{
//     this.props.setMessage("")
//   }
  turnOffError = () => {
    this.props.setError("");
  };
  render() {
    let { navigate } = this.props.router;
    const { error } = this.props;
    return (
      <div style={{ width: "100vw" }}>
        <Form onSubmit={this.registNewUser} className="px-3">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" name="name" onFocus={this.turnOffError}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="userName"
              onFocus={this.turnOffError}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" onFocus={this.turnOffError}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onFocus={this.turnOffError}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password again</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password again"
              name="passwordAgain"
              onFocus={this.turnOffError}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone contact</Form.Label>
            <Form.Control
              type="number"
              placeholder="Phone contact"
              name="phoneNumber"
              onFocus={this.turnOffError}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" style={{ marginRight: "20px" }}>
                Register
              </Button>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign in
              </Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 3, offset: 2 }}>
              <div style={this.renderErrorMessage()}>
              { error }
              </div>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.commonReducer.error,
});

const mapDispatchToProps = {
  setError,
  insertUser,
  setMessage
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
