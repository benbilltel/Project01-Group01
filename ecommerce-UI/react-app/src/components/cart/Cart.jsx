import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";
import {
  insertCart,
  getCartsByIdUser,
  deleteByProductId,
  deleteByUserId,
} from "../../redux/actions/cartAction";
import ModalShowMessage from "../../helpers/ModalShowMessage";
import ModalShowError from "../../helpers/ModalShowError";
class Cart extends Component {
  decProduct = async (idProduct) => {
    const { user } = this.props;
    let cart = {
      userId: user.id,
      productId: idProduct,
      quantity: -1,
    };
    try {
      await this.props.insertCart(cart);
      await this.props.getCartsByIdUser(user.id);
    } catch (error) {
      console.log(error);
      // display error message to user
    }
  };
  incProduct = async (idProduct) => {
    const { user } = this.props;
    let cart = {
      userId: user.id,
      productId: idProduct,
      quantity: 1,
    };
    try {
      await this.props.insertCart(cart);
      await this.props.getCartsByIdUser(user.id);
    } catch (error) {
      console.log(error);
      // display error message to user
    }
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
  removeProduct = async (id) => {
    const { user } = this.props;
    try {
      await this.props.deleteByProductId(id);
      await this.props.getCartsByIdUser(user.id);
    } catch (error) {
      console.log(error);
      // display error message to user
    }
  };
  clearAll = async () => {
    const { user } = this.props;
    try {
      await this.props.deleteByUserId(user.id);
      await this.props.getCartsByIdUser(user.id);
    } catch (error) {
      console.log(error);
      // display error message to user
    }
  };
  renderCart = (carts) => {
    if (carts.length > 0) {
      return (
        <>
          <Table striped bordered>
            <thead>
              <tr>
                <th></th>
                <th hidden>#</th>
                <th hidden>id product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart, index) => (
                <tr key={cart.id}>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        this.removeProduct(cart.id);
                      }}
                    >
                      X
                    </Button>
                  </td>
                  <td hidden>{cart.id}</td>
                  <td hidden>{cart.productDto.id}</td>
                  <td>{cart.productDto.name}</td>
                  <td>{cart.productDto.price}</td>
                  <td>
                    <img
                      src={`data:image/jpeg;base64,${cart.productDto.image}`}
                      alt={cart.productDto.name}
                      width="100"
                    />
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        this.decProduct(cart.productDto.id);
                      }}
                    >
                      -
                    </Button>{" "}
                    {cart.quantity}
                    <Button
                      variant="primary"
                      onClick={() => {
                        this.incProduct(cart.productDto.id);
                      }}
                    >
                      +
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary">Add To Pay</Button>
          <Button
            variant="danger"
            onClick={() => {
              this.clearAll();
            }}
          >
            Clear All
          </Button>
        </>
      );
    }
    return <div>Add some product!</div>;
  };
  render() {
    const { carts } = this.props;
    return (
      <div className="container">
        {this.renderErrorMessage()}
        {this.renderMessage()}
        {this.renderCart(carts)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  carts: state.cartReducer.carts,
  message: state.commonReducer.message,
  error: state.commonReducer.error,
});
const mapDispatchToProps = {
  insertCart,
  getCartsByIdUser,
  deleteByProductId,
  deleteByUserId,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
