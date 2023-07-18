import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import ModalShowError from "../../helpers/ModalShowError";
import ModalShowMessage from "../../helpers/ModalShowMessage";
import { setError ,setMessage} from "../../redux/actions/commonAction";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import {
  insertOrder,
  insertOrderInfo,
} from "../../redux/actions/paymentAction";
import { LocalDate, DateTimeFormatter } from "js-joda";
import { deleteByUserId } from "../../redux/actions/cartAction";
class OrderInfo extends Component {
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
  purchase = async (event) => {
    event.preventDefault();
    try {
      const { user, carts } = this.props;
      let date = new Date();
      let jsonDate = JSON.stringify(date.toISOString().substring(0, 10));
      let formatter = DateTimeFormatter.ofPattern('"yyyy-MM-dd"');
      let localDate = LocalDate.parse(jsonDate, formatter);
      let idsCart = [];
      carts.forEach((element) => {
        idsCart.push(element.id);
      });
      const address = event.target.elements.address.value;
      const phoneContact = event.target.elements.phoneContact.value;
      const total = event.target.elements.total.value;

      let orderInfoPass = {
        userId: user.id,
        phoneContact: phoneContact,
        status: "InProgress",
        total: total,
        address: address,
        date: localDate,
      };
      await this.props.insertOrderInfo(orderInfoPass);
      // await new Promise((resolve) => setTimeout(resolve, 100)); 
      await this.props.insertOrder(idsCart);
      await this.props.deleteByUserId(user.id);
      this.props.setMessage("Purchase completed!");
      const {navigate} = this.props.router
      navigate("/history")
      
    } catch (error) {}
  };
  render() {
    const { navigate } = this.props.router;
    const { carts } = this.props;
    let total = 0;
    if (carts) {
      carts.forEach((element) => {
        total += element.productDto.price * element.quantity;
      });
    }

    return (
      <div>
        {this.renderErrorMessage()}
        {this.renderMessage()}
        <div>
          <Form onSubmit={this.purchase} className="px-3">
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Address" name="address" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone contact</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phone contact"
                name="phoneContact"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                name="total"
                readOnly
                defaultValue={total}
              />
            </Form.Group>
            <Form.Group>
              <div style={{ height: "200px", overflow: "auto" }}>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th hidden>#</th>
                      <th hidden>id product</th>
                      <th>Name</th>
                      <th>Price($)</th>
                      <th>Image</th>
                      <th>Quantity</th>
                      <th>Total($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((cart, index) => (
                      <tr key={cart.id}>
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
                        <td>{cart.quantity}</td>
                        <td>{cart.productDto.price * cart.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" style={{ marginRight: "20px" }}>
                  Purchase
                </Button>
                <Button
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.commonReducer.error,
  message: state.commonReducer.message,
  user: state.userReducer.user,
  carts: state.cartReducer.carts,
});

const mapDispatchToProps = {
  setError,
  insertOrder,
  insertOrderInfo,
  deleteByUserId,
  setMessage
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderInfo)
);
