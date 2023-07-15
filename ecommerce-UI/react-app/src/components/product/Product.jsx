import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import ModalShowMessage from "../../helpers/ModalShowMessage";
import ModalShowError from "../../helpers/ModalShowError";
import {
  getAllCategories,
  clearStateCategory,
} from "../../redux/actions/categoryAction";
import {insertCart,getCartsByIdUser} from "../../redux/actions/cartAction"
import {
  getAllProducts,
  clearStateProduct,
} from "../../redux/actions/productAction";
import { Button, Card } from "react-bootstrap";
class Product extends Component {
  constructor() {
    super();
    this.state = {
      idCategory: "All",
      showProduct: [], // store the content returned by showProductsByIdCategory
    };
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
    const { categories } = this.props;
    if (!categories) {
      return;
    }
    let showCategory = categories.map((category) => {
      if (category.status === "Visible") {
        return (
          <Button
            key={category.id}
            value={category.id}
            className="col-12 mb-2"
            variant="secondary"
            onClick={() => this.showProductsByIdCategory(category.id)}
          >
            {category.name}
          </Button>
        );
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
    const {navigate} = this.props.router
    const {user} = this.props
    if(Object.keys(user).length === 0){
      navigate("/login")
      return;
    }
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
        <Card  key={product.id} className="col-4 mb-3">
          <Card.Img
            variant="top"
            src={`data:image/jpeg;base64,${product.image}`}
          />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>{product.price}$</Card.Text>
            <Button
              variant="primary"
              onClick={() => this.addToCart(product.id)}
            >
              Add To Cart
            </Button>
          </Card.Body>
        </Card>
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
        <Card  key={product.id} className="col-4 mb-3" >
          <Card.Img
            variant="top"
            src={`data:image/jpeg;base64,${product.image}`}
          />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>{product.price}$</Card.Text>
            <Button
              variant="primary"
              onClick={() => this.addToCart(product.id)}
            >
              Add To Cart
            </Button>
          </Card.Body>
        </Card>
      ));
      this.setState({ showProduct: showProduct });
    }
  };
  render() {
    const { showProduct } = this.state;
    return (
      <div className="container">
        {this.renderErrorMessage()}
        {this.renderMessage()}
        <div
          className="row p-3 "
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          <div className="col-2">
            <div
              className="row p-5 "
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px ",
              }}
            >
              <Button
                key="AllCategories"
                value="All"
                className="col-12 mb-2"
                variant="secondary"
                onClick={() => this.showProductsByIdCategory("All")}
              >
                All
              </Button>
              {this.showCategories()}
            </div>
          </div>
          <div className="col-10 px-5 ">
            <div className="row ">{showProduct}</div>
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
  user:state.userReducer.user,
});
const mapDispatchToProps = {
  getAllCategories,
  clearStateCategory,
  getAllProducts,
  clearStateProduct,
  insertCart,getCartsByIdUser
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
