import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import ModalShowMessage from "../../helpers/ModalShowMessage";
import ModalShowError from "../../helpers/ModalShowError";
import {
  getAllCartsByOrderInfo,
  getAllOrderInfoByIdUser,
  clearPaymentState,
} from "../../redux/actions/paymentAction";
import { Button, Table } from "react-bootstrap";
import ModalShowProduct from "../../helpers/ModalShowProduct";
class ShoppingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProductModal: false,
      cartsPay: [],
    };
  }
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
  viewDetail = async (id) => {
    try {
      await this.props.getAllCartsByOrderInfo(id);
      const { cartsPay } = this.props;
      this.setState({ cartsPay: cartsPay ,showProductModal: true });
    } catch (error) {}
  };
  componentDidMount = async () => {
    try {
      const { user } = this.props;
      await this.props.getAllOrderInfoByIdUser(user.id);
    } catch (error) {
      console.log(error);
    }
  };
  componentWillUnmount = async () => {
    await this.props.clearPaymentState();
  };
  render() {
    const { orderInfos } = this.props;
    const {cartsPay,showProductModal} = this.state
    return (
      <div>
        {this.renderErrorMessage()}
        {this.renderMessage()}
        <div style={{ height: "200px", overflow: "auto" }}>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone contact</th>
                <th>Total($)</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderInfos.map((orderInfo, index) => (
                <tr key={orderInfo.id}>
                  <td>{orderInfo.id}</td>
                  <td>{orderInfo.userDto.name}</td>
                  <td>{orderInfo.address}</td>
                  <td>{orderInfo.phoneContact}</td>
                  <td>{orderInfo.total}</td>
                  <td>{orderInfo.status}</td>
                  <td>
                    <Button onClick={()=>{
                        this.viewDetail(orderInfo.id)
                    }}>
                      View detail
                    </Button>
                    <Button>Completed</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {showProductModal && (
            <ModalShowProduct
              heading="Products"
              cartsPay={cartsPay}
              handleClose={() => this.setState({ showProductModal: false })}
            />
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.commonReducer.error,
  message: state.commonReducer.message,
  orderInfos: state.paymentReducer.orderInfos,
  cartsPay: state.paymentReducer.cartsPay,
  user: state.userReducer.user,
});

const mapDispatchToProps = {
  getAllCartsByOrderInfo,
  getAllOrderInfoByIdUser,
  clearPaymentState,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShoppingHistory)
);
