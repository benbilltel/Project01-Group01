import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import Nav from "react-bootstrap/Nav";
import { Outlet } from "react-router-dom";
class CategoryAdmin extends Component {
  render() {
    const { navigate } = this.props.router;
    return (
      <div
        className="d-flex justify-content-center"
        style={{ width: "100%", margin: "0" }}
      >
        <div
          style={{
            marginTop: "20px",
            padding: "30px",

            width: "90%",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <Nav variant="underline">
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  navigate("/admin/categoryAdmin/add");
                }}
                className="hover-link"
                style={{
                  cursor: "pointer",
                  marginBottom: "20px",
                  color: "black",
                }}
                active={
                  location.pathname.startsWith("/admin/categoryAdmin/add") ||
                  location.pathname.startsWith("/admin/categoryAdmin/update")
                }
              >
                Add new category
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  navigate("/admin/categoryAdmin/list");
                }}
                className="hover-link"
                style={{
                  cursor: "pointer",
                  marginBottom: "20px",
                  color: "black",
                }}
                active={location.pathname.startsWith(
                  "/admin/categoryAdmin/list"
                )}
              >
                {" "}
                List categories
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  navigate("/admin/categoryAdmin/recycleBin");
                }}
                className="hover-link"
                style={{
                  cursor: "pointer",
                  marginBottom: "20px",
                  color: "black",
                }}
                active={location.pathname.startsWith(
                  "/admin/categoryAdmin/recycleBin"
                )}
              >
                {" "}
                Recycle Bin
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Outlet></Outlet>
        </div>
      </div>
    );
  }
}
export default withRouter(CategoryAdmin);
