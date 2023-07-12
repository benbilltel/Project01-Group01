import React, { Component } from 'react'
import withRouter from '../../helpers/withRouter'
import {setError} from "../../redux/actions/commonAction"
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import {getAllCategories,clearStateCategory} from '../../redux/actions/categoryAction'
import {insertProduct} from "../../redux/actions/productAction"
import ModalShowMessage from '../../helpers/ModalShowMessage';
import ModalShowError from '../../helpers/ModalShowError';
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
  componentDidMount=()=>{
    this.props.getAllCategories();
  }
  componentWillUnmount=()=>{
    this.props.clearStateCategory();
  }
  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const {navigate} = this.props.router
    console.log(formData.get("categoryId"))
    this.props.insertProduct(formData,navigate)
    
  };
  renderCategories=()=>{
    let { categories } = this.props;
  if (!categories || categories.length === 0) {
    return ;
  }
  let selectOptions = categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ));
  return selectOptions;
  }
  render() {
    return (
      <div>{this.renderErrorMessage()}
      {this.renderMessage()}
      <Form onSubmit={this.handleSubmit} encType='multipart/form-data'>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product name"
          name='name'
          
        />
      </Form.Group>

      <Form.Group controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter product price"
          name='price'
         
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter product description"
          name='description'
          
        />
      </Form.Group>

      <Form.Group controlId="formCategoryId">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name='categoryId'  
        >
          {this.renderCategories()}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formStatus">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="status"
          
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
        Submit
      </Button>
    </Form>
      </div>
    )
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
  insertProduct
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddOrEditProduct)
);