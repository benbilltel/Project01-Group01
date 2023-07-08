import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { connect } from "react-redux";
import { clearStateUser } from "../../redux/actions/userAction";
import { Outlet } from "react-router-dom";
class Admin extends Component {
  renderProfile = () => {
    const { navigate } = this.props.router;
    const { user } = this.props;
    if(Object.keys(user).length === 0){
      return(<></>);
    }
    if (user) {
      return (
        <Nav.Link
          onClick={() => {
            navigate("/admin");
          }}
          className="col-6"
        >
          {user.name}
        </Nav.Link>
      );
    }
  };
  componentDidMount=()=>{
    const { navigate } = this.props.router;
    const {user} = this.props
    if(Object.keys(user).length === 0|| (user&& user.type === "User")){
      navigate("/")
    }
  }
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
          className="col-6"
        >
          Login
        </Nav.Link>
      );
    }
    return (
      <Nav.Link
        onClick={() => {
          this.props.clearStateUser();
          navigate("/login");
        }}
        className="col-6"
      >
        LogOut
      </Nav.Link>
    );
  };
  render() {
    const { navigate } = this.props.router;
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
              Logo
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  onClick={() => {
                    navigate("/admin/categoryAdmin");
                  }}
                >
                  Category
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/admin/productAdmin");
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
            </Navbar.Collapse>
          </Container>
          <Container className="col-6">
            {this.renderProfile()}
            {this.renderLoginPage()}
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
