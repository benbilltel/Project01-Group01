import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import {clearStateUser } from "../../redux/actions/userAction";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      count: 7,
    };
  }
  render() {
    let { navigate } = this.props.router;
    let { count } = this.state;
    let { user } = this.props;
    return (
      <div style={{ width: "100vw" }}>
        <Navbar expand="lg" className="bg-body-tertiary px-5">
          <Container className="col-6">
            <Navbar.Brand
              onClick={() => {
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            >
              React-Bootstrap
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/about");
                  }}
                >
                  About
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/contact");
                  }}
                >
                  Contact
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
          <Container className="col-6">
            <Nav.Link
              onClick={() => {
                navigate("/login");
              }}
              className="col-6"
            >
              Login
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                this.props.clearStateUser();
                navigate("/login");
              }}
              className="col-6"
            >
              LogOut
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
              className="col-6"
            >
              Cart <BsFillCartCheckFill></BsFillCartCheckFill>
              <span>{count}</span>
            </Nav.Link>
          </Container>
        </Navbar>
        <div className="content-outlet">
          <Outlet></Outlet>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = {
  clearStateUser,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
