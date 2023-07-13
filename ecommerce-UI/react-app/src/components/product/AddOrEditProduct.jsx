import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import { setError } from "../../redux/actions/commonAction";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getAllCategories,
  clearStateCategory,
} from "../../redux/actions/categoryAction";
import {
  insertProduct,
  clearStateProduct,
  updateProduct
} from "../../redux/actions/productAction";
import ModalShowMessage from "../../helpers/ModalShowMessage";
import ModalShowError from "../../helpers/ModalShowError";
class AddOrEditProduct extends Component {
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
  componentDidMount = () => {
    this.props.getAllCategories();
    
  };
  componentWillUnmount = () => {
    this.props.clearStateCategory();
    this.props.clearStateProduct();
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const {id} = this.props.router.params
    const formData = new FormData(event.target);
    if(formData.get("name")===""){
      this.props.setError("Name is required!");
      return;
    }
    if(formData.get("price")===""){
      this.props.setError("Price is required!");
      return;
    }
    if(formData.get("description")===""){
      this.props.setError("Description is required!");
      return;
    }
    if(formData.get("status")===""){
      this.props.setError("Status is required!");
      return;
    }
    if(formData.get("categoryId")===""){
      this.props.setError("Category is required!");
      return;
    }
    const { navigate } = this.props.router;
    if(!id){
      this.props.insertProduct(formData, navigate);
      return;
    }
    if(id){
      this.props.updateProduct(id,formData,navigate)
      return;
    }
    
  };
  renderCategories = () => {
    let { categories } = this.props;
    if (!categories || categories.length === 0) {
      return;
    }
    let selectOptions = categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ));
    return selectOptions;
  };
  render() {
    const { id } = this.props.router.params;
    const { product } = this.props;
    return (
      <div>
        {this.renderErrorMessage()}
        {this.renderMessage()}
        <Form
          onSubmit={this.handleSubmit}
          encType="multipart/form-data"
          key={product.id + "$"}
        >
          <Form.Group className="mb-3" hidden={id ? false : true}>
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              name="id"
              readOnly
              defaultValue={product ? id : ""}
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="name"
              defaultValue={product? product.name : ""}
            />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product price"
              name="price"
              defaultValue={product? product.price : ""}
              max={false}
              min="0"
            />
          </Form.Group>
          <Form.Group controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity are available"
              name="quantity"
              defaultValue={product? product.quantity : ""}
              max={false}
              min="0"
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter product description"
              name="description"
              defaultValue={product? product.description : ""}
            />
          </Form.Group>

          <Form.Group controlId="formCategoryId">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="categoryId"
            >
              {this.renderCategories()}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              defaultValue={product? product.status: "Active"}
            >
              <option>Active</option>
              <option>Inactive</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/jpeg"
              name="image"
              multiple={false}  
            />
          </Form.Group>

          <Button variant="primary" type="submit">
          {id ? "Update" : "Save"}
          </Button>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories,
  error: state.commonReducer.error,
  message: state.commonReducer.message,
  product: state.productReducer.product,
});

const mapDispatchToProps = {
  setError,
  getAllCategories,
  clearStateCategory,
  insertProduct,
  clearStateProduct,
  updateProduct
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddOrEditProduct)
);
