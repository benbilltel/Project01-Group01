import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import ModalShowError from "../../helpers/ModalShowError";
import ModalShowMessage from "../../helpers/ModalShowMessage";
import { setError } from "../../redux/actions/commonAction";
import {
  getAllProducts,
  clearStateProduct,
  setProductState,
  deleteProductById,
} from "../../redux/actions/productAction";
import { connect } from "react-redux";
class ListProductAdmin extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: "",
      showProduct: [], // store the content returned by showProductsByIdCategory
    };
    this.searchInput = React.createRef();
  }
  handleEditClick = (id) => {
    if (id) {
      const { navigate } = this.props.router;
      this.props.setProductState(id);
      navigate("/admin/productAdmin/update/" + id);
      return;
    }
    return this.props.setError("Something was wrong!");
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
  async componentDidMount() {
    try {
      await Promise.all([this.props.getAllProducts()]);

      const { searchQuery } = this.state;
      const { products } = this.props;
      if (searchQuery === "") {
        const showProduct = products.map((product, index) => (
          <tr key={index}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>{product.description}</Tooltip>}
              >
                <div className="desc-wrap">{product.description}</div>
              </OverlayTrigger>
            </td>
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
                style={{ padding: "0px 20px 0" }}
                onClick={() => this.handleEditClick(product.id)}
              >
                Edit
              </Button>{" "}
              <Button
                variant="danger"
                style={{ padding: "0px 10px 0" }}
                onClick={() => this.handleDeleteClick(product.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ));
        this.setState({ showProduct, searchQuery });
      }
    } catch (error) {
      console.log(error);
      // display error message to user
    }
  }
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
  componentDidUpdate(prevProps, prevState) {
    // If the search query has changed, focus on the input element
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.searchInput.current.focus();
    }
  }
  handleSearch = (event) => {
    const searchQuery = event.target.value;
    const { products } = this.props;
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const showProduct = filteredProducts.map((product, index) => (
      <tr key={index}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{product.description}</Tooltip>}
          >
            <div className="desc-wrap">{product.description}</div>
          </OverlayTrigger>
        </td>
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
            style={{ padding: "0px 20px 0" }}
            onClick={() => this.handleEditClick(product.id)}
          >
            Edit
          </Button>{" "}
          <Button
            variant="danger"
            style={{ padding: "0px 10px 0" }}
            onClick={() => this.handleDeleteClick(product.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));
    this.setState({ showProduct, searchQuery });
  };
  render() {
    const { products } = this.props;
    const { searchQuery, showProduct } = this.state;
    return (
      <>
      <input
          key="search-input"
          type="text"
          value={searchQuery}
          onChange={this.handleSearch}
          placeholder="Search products by name"
          ref={this.searchInput}
          className="col-6 find-product"
        />
    
      <div style={{ maxHeight: "54vh", overflowY: "auto" }}>
        {this.renderErrorMessage()}
        {this.renderMessage()}
        
        <Table striped bordered className="carts">
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
          <tbody>{showProduct}</tbody>
        </Table>
      </div>
      </>
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
  deleteProductById,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListProductAdmin)
);
