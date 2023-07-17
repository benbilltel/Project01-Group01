import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import ModalShowError from "../../helpers/ModalShowError";
import ModalShowMessage from "../../helpers/ModalShowMessage";
import { setError } from "../../redux/actions/commonAction";
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
  render() {
    return (
      <div>
        {this.renderErrorMessage()}
        {this.renderMessage()}orderInfo
      </div>
    );
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
  connect(mapStateToProps, mapDispatchToProps)(OrderInfo)
);