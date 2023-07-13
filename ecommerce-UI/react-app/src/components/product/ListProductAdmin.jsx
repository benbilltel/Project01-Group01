import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import { Button, Table } from "react-bootstrap";
import ModalShowError from "../../helpers/ModalShowError";
import ModalShowMessage from "../../helpers/ModalShowMessage";
import { setError } from "../../redux/actions/commonAction";
import {
  getAllProducts,
  clearStateProduct,
  setProductState,
  deleteProductById
} from "../../redux/actions/productAction";
import { connect } from "react-redux";
class ListProductAdmin extends Component {
  handleEditClick = (id) => {
    if(id){
      const {navigate} = this.props.router
    this.props.setProductState(id);
    navigate("/admin/productAdmin/update/"+id);
    return;
    }
    return  this.props.setError("Something was wrong!");
  };
  handleDeleteClick = (id) => {
    if (id) {
      this.props.deleteProductById(id);
      return;
    }
    return this.props.setError("Something was wrong!");
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
  componentDidMount = () => {
    this.props.getAllProducts();
  };
  componentWillUnmount = () => {
    this.props.clearStateProduct();
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
    const { products } = this.props;
    return (
      <div>
        {this.renderErrorMessage()}
        {this.renderMessage()}
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price($)</th>
              <th>Description</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.category.name}</td>
                <td>{product.quantity}</td>
                <td>
                  {product.status === "Active" ? (
                    <div
                      style={{
                        border: "1px solid green",
                        borderRadius: "3px",
                        color: "green",
                        maxWidth: "120px",
                        textAlign: "center",
                      }}
                    >
                      Active
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
                      Inactive
                    </div>
                  )}
                </td>
                <td>
                  <img
                    src={`data:image/jpeg;base64,${product.image}`}
                    alt={product.name}
                    width="100"
                  />
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => this.handleEditClick(product.id)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => this.handleDeleteClick(product.id)}
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
  products: state.productReducer.products,
  error: state.commonReducer.error,
  message: state.commonReducer.message,
});

const mapDispatchToProps = {
  setError,
  getAllProducts,
  clearStateProduct,
  setProductState,
  deleteProductById
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListProductAdmin)
);
