import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import { getUserByUserName } from "../../redux/actions/userAction";
import { setError } from "../../redux/actions/commonAction";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        // id: "",
        // name: "",
        userName: "",
        password: "",
        // email: "",
        // phoneNumber: "",
        // type: "",
      },
    };
  }
  signUp = (event) => {
    event.preventDefault();
    const userName = event.target.elements.userName.value;
    const password = event.target.elements.password.value;
    let { user } = this.state;
    let { navigate } = this.props.router;
    user.userName = userName;
    user.password = password;
    this.props.getUserByUserName(user, navigate);
  };
  renderErrorMessage = () => {
    const { error } = this.props;
    if (error) {
      return { display: "block", color: "red" };
    }
    return { display: "none" };
  };
  turnOffError=()=>{
    this.props.setError("")
  }
  render() {
    const { error } = this.props;

    return (
      <div style={{ width: "100vw" }}>
        <Form className="px-3" onSubmit={this.signUp}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Username
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Username"
                name="userName"
                onFocus={this.turnOffError}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onFocus={this.turnOffError}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Sign in</Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 3, offset: 2 }}>
              <div style={this.renderErrorMessage()}>Wrong username or passowrd !</div>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  error: state.commonReducer.error,
});

const mapDispatchToProps = {
  getUserByUserName,
  setError,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
