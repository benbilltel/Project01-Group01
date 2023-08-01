import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import ModalShowMessage from "../../helpers/ModalShowMessage";
import ModalShowError from "../../helpers/ModalShowError";
import {
  getAllCategories,
  clearStateCategory,
} from "../../redux/actions/categoryAction";
import { insertCart, getCartsByIdUser } from "../../redux/actions/cartAction";
import {
  getAllProducts,
  clearStateProduct,
} from "../../redux/actions/productAction";
import { Button, Card } from "react-bootstrap";
import "./Product.css";
class Product extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: "",
      idCategory: "All",
      showProduct: [], // store the content returned by showProductsByIdCategory
    };
    this.searchInput = React.createRef();
  }
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
  showCategories = () => {
    const { categories, products } = this.props;
    if (!categories) {
      return;
    }

    let showCategory = categories.map((category) => {
      if (category.status === "Visible") {
        let filteredProducts = products.filter(
          (product) =>
            product.status === "Active" && product.category.id === category.id
        );
        if (filteredProducts.length > 0) {
          return (
            <button
              key={category.id}
              value={category.id}
              className="col-lg-2 col-sm-3 m-2"
              onClick={() => this.showProductsByIdCategory(category.id)}
            >
              {category.name}
            </button>
          );
        }
      }
    });
    return showCategory;
  };
  async componentDidMount() {
    try {
      await Promise.all([
        this.props.getAllCategories(),
        this.props.getAllProducts(),
      ]);
      this.showProductsByIdCategory("All");
    } catch (error) {
      console.log(error);
      // display error message to user
    }
  }
  componentWillUnmount = () => {
    this.props.clearStateCategory();
    this.props.clearStateProduct();
  };
  addToCart = async (idProduct) => {
    const { navigate } = this.props.router;
    const { user } = this.props;
    if (Object.keys(user).length === 0) {
      navigate("/login");
      return;
    }
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
  showProductsByIdCategory = (id) => {
    const { products } = this.props;
    if (!products) {
      return;
    }
    if (id !== this.state.idCategory) {
      let filteredProducts;
      if (id !== "All") {
        filteredProducts = products.filter(
          (product) => product.status === "Active" && product.category.id === id
        );
      } else {
        filteredProducts = products.filter(
          (product) => product.status === "Active"
        );
      }
      let showProduct = filteredProducts.map((product) => (
        <div
          className="col-md-6 col-xl-4 p-3"
          key={product.id + "@"}
          style={{ cursor: "pointer" }}
        >
          <Card style={{ maxHeight: "450px", minHeight: "450px" }}>
            <Card.Img
              variant="top"
              src={`data:image/jpeg;base64,${product.image}`}
            />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text className="price">{product.price}$</Card.Text>
              <button
                className="add-to-cart "
                onClick={() => this.addToCart(product.id)}
              >
                Add To Cart
              </button>
            </Card.Body>
          </Card>
        </div>
      ));
      this.setState({ idCategory: id, showProduct: showProduct });
    } else {
      let filteredProducts;
      if (id !== "All") {
        filteredProducts = products.filter(
          (product) => product.status === "Active" && product.category.id === id
        );
      } else {
        filteredProducts = products.filter(
          (product) => product.status === "Active"
        );
      }
      let showProduct = filteredProducts.map((product) => (
        <div
          className="col-md-6 col-xl-4 p-3"
          key={product.id + "@"}
          style={{ cursor: "pointer" }}
        >
          <Card style={{ maxHeight: "450px", minHeight: "450px" }}>
            <Card.Img
              variant="top"
              src={`data:image/jpeg;base64,${product.image}`}
            />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text className="price">{product.price}$</Card.Text>
              <button
                className="add-to-cart "
                onClick={() => this.addToCart(product.id)}
              >
                Add To Cart
              </button>
            </Card.Body>
          </Card>
        </div>
      ));
      this.setState({ showProduct: showProduct });
    }
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
    const showProduct = filteredProducts.map((product) => (
      <div
        className="col-md-6 col-xl-4 p-3 product-show"
        key={product.id + "@"}
        style={{ cursor: "pointer" }}
      >
        <Card style={{ maxHeight: "450px", minHeight: "450px" }}>
          <Card.Img
            variant="top"
            src={`data:image/jpeg;base64,${product.image}`}
          />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text className="price">{product.price}$</Card.Text>
            <button
              className="add-to-cart "
              onClick={() => this.addToCart(product.id)}
            >
              Add To Cart
            </button>
          </Card.Body>
        </Card>
      </div>
    ));
    this.setState({ showProduct, searchQuery });
  };

  render() {
    const { showProduct, searchQuery } = this.state;
    return (
      <div className="container products-container p-3">
        {this.renderErrorMessage()}
        {this.renderMessage()}
        <div
          className="row p-3 "
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          <div className="col-12 category-pick container">
            <div className="row p-5">
              <input
                key="search-input"
                type="text"
                value={searchQuery}
                onChange={this.handleSearch}
                placeholder="Search products by name"
                ref={this.searchInput}
                className="col-12 find-product "
              />

              <button
                key="All"
                value="All"
                className="col-md-2 col-sm-3 m-2"
                autoFocus
                onClick={() => this.showProductsByIdCategory("All")}
              >
                All
              </button>
              {this.showCategories()}
            </div>
          </div>
          <hr className="my-hr" />
          <div className="col-12 px-5 products" style={{ marginTop: "2rem" }}>
            <div
              className="row"
              style={{ maxHeight: "700px", overflow: "auto" }}
            >
              {showProduct}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories,
  error: state.commonReducer.error,
  message: state.commonReducer.message,
  products: state.productReducer.products,
  user: state.userReducer.user,
});
const mapDispatchToProps = {
  getAllCategories,
  clearStateCategory,
  getAllProducts,
  clearStateProduct,
  insertCart,
  getCartsByIdUser,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
