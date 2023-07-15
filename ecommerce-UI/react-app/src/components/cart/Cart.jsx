import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";
import {insertCart,getCartsByIdUser} from "../../redux/actions/cartAction"
class Cart extends Component {
  decProduct = async (idProduct)=>{
    const {user} = this.props
    let cart = {
      "userId":user.id,
      "productId":idProduct,
      "quantity":-1
    }
    try {
      await this.props.insertCart(cart);
      await this.props.getCartsByIdUser(user.id);
    } catch (error) {
      console.log(error);
      // display error message to user
    }
  }
  incProduct = async (idProduct)=>{
    const {user} = this.props
    let cart = {
      "userId":user.id,
      "productId":idProduct,
      "quantity":1
    }
    try {
      await this.props.insertCart(cart);
      await this.props.getCartsByIdUser(user.id);
    } catch (error) {
      console.log(error);
      // display error message to user
    }
  }
  render() {
    const { carts } = this.props;
    return (
      <div className="container">
        {/* {this.renderErrorMessage()}
        {this.renderMessage()} */}
        <Table striped bordered>
          <thead>
            <tr>
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
                <td  hidden>{cart.id}</td>
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
                  <Button variant="danger" onClick={()=>{
                    this.decProduct(cart.productDto.id)
                  }}>-</Button> {cart.quantity}
                  <Button variant="primary" onClick={()=>{
                    this.incProduct(cart.productDto.id)
                  }}>+</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button
              variant="primary"
           
            >
              Add To Pay
            </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  carts: state.cartReducer.carts,
});
const mapDispatchToProps = {
insertCart,getCartsByIdUser
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
