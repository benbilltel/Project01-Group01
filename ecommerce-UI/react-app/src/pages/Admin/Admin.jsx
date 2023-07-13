import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { connect } from "react-redux";
import { clearStateUser } from "../../redux/actions/userAction";
import { Outlet } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
class Admin extends Component {
  renderProfile = () => {
    const { navigate } = this.props.router;
    const { user } = this.props;
    if (Object.keys(user).length === 0) {
      return <></>;
    }
    if (user) {
      return (
        <NavDropdown title={user.name} id="basic-nav-dropdown">
          <NavDropdown.Item>Profile</NavDropdown.Item>
          <NavDropdown.Item>Setting</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            onClick={() => {
              this.props.clearStateUser();
              navigate("/login");
            }}
          >
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      );
    }
  };
  componentDidMount = () => {};
  renderLoginPage = () => {
    const { user } = this.props;
    const { navigate } = this.props.router;
    if (Object.keys(user).length === 0) {
      return (
        <Nav.Link
          onClick={() => {
            this.props.clearStateUser();
            navigate("/login");
          }}
        >
          Login
        </Nav.Link>
      );
    }
    return;
  };
  render() {
    const { navigate } = this.props.router;
    return (
      <div style={{ width: "100vw" }}>
        <Navbar expand="lg" className="bg-body-tertiary px-5">
          <Container >
            <Navbar.Brand
              onClick={() => {
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            >
              Logo
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  onClick={() => {
                    navigate("/admin/categoryAdmin/add");
                  }}
                >
                  Category
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/admin/productAdmin/add");
                  }}
                >
                  Product
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/admin/invoice");
                  }}
                >
                  Invoice
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/admin");
                  }}
                >
                  Account
                </Nav.Link>
              </Nav>
              <Nav>
                {this.renderProfile()}
                {this.renderLoginPage()}
              </Nav>
            </Navbar.Collapse>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));
