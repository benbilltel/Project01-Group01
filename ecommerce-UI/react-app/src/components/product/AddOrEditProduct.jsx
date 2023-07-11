import React, { Component } from 'react'
import withRouter from '../../helpers/withRouter'
import {setError} from "../../redux/actions/commonAction"
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
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
  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // get form field values
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");
    const categoryId = formData.get("categoryId");
    const status = formData.get("status");
    const image = formData.get("image");
    console.log(name, price, description, categoryId, status, image);
    
  };
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
        <Form.Label>Category ID</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter product category ID"
          name='categoryId'
          
        />
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
  error: state.commonReducer.error,
  message: state.commonReducer.message,
});

const mapDispatchToProps = {
  setError,
  
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddOrEditProduct)
);