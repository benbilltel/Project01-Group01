import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getAllCategories,
  clearStateCategory,
  setCategoryState,
  deleteCategoryById,
} from "../../redux/actions/categoryAction";
import { setError, setMessage } from "../../redux/actions/commonAction";
import ModalShowError from "../../helpers/ModalShowError";
import ModalShowMessage from "../../helpers/ModalShowMessage";
class ListCategory extends Component {
  handleEditClick = (id) => {
    if (id) {
      const { navigate } = this.props.router;
      this.props.setCategoryState(id);
      navigate("/admin/categoryAdmin/update/" + id);
      return;
    }
    return this.props.setError("Something was wrong!");
  };

  handleDeleteClick = (id) => {
    if (id) {
      this.props.deleteCategoryById(id);
      return;
    }
    return this.props.setError("Something was wrong!");
  };
  componentDidMount = () => {
    this.props.getAllCategories();
  };
  componentWillUnmount = () => {
    this.props.clearStateCategory();
  };
  renderErrorMessage = () => {
    const { error } = this.props;
    if (error) {
      return (
        <ModalShowError
          content={error}
          heading="Something is wrong!"
        ></ModalShowError>
      );
    }
    return <></>;
  };
  renderMessage = () => {
    const { message } = this.props;
    if (message) {
      return (
        <ModalShowMessage
          content={message}
          heading="Successfull!"
        ></ModalShowMessage>
      );
    }
    return <></>;
  };
  render() {
    const { categories } = this.props;
    return (
      <div>
        {this.renderErrorMessage()}
        {this.renderMessage()}
        <Table striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  {category.status === "Visible" ? (
                    <div
                      style={{
                        border: "1px solid green",
                        borderRadius: "3px",
                        color: "green",
                        maxWidth: "120px",
                        textAlign: "center",
                      }}
                    >
                      Visible
                    </div>
                  ) : (
                    <div
                      style={{
                        border: "1px solid red",
                        borderRadius: "3px",
                        color: "red",
                        maxWidth: "120px",
                        textAlign: "center",
                      }}
                    >
                      Invisible
                    </div>
                  )}
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => this.handleEditClick(category.id)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => this.handleDeleteClick(category.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories,
  error: state.commonReducer.error,
  message: state.commonReducer.message,
});

const mapDispatchToProps = {
  setError,
  getAllCategories,
  clearStateCategory,
  setCategoryState,
  setMessage,
  deleteCategoryById,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListCategory)
);
