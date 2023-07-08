import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/User/Home";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import CategoryAdmin from "./components/category/CategoryAdmin";
import ProductAdmin from "./components/product/ProductAdmin";
import Product from "./components/product/Product";
import Invoice from "./components/invoice/Invoice";
import store from "./redux/store";
import { Provider } from "react-redux";
import Register from "./pages/register/Register";
class App extends Component {
  render() {
    return (
     <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route index path="/" element={<Home />}></Route>
          <Route path="/" element={<Home />}>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/productAdmin" element={<Product/>}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/admin" element={<Admin />}>
            <Route path="/admin/categoryAdmin" element={<CategoryAdmin/>}></Route>
            <Route path="/admin/productAdmin" element={<ProductAdmin/>}></Route>
            <Route path="/admin/invoice" element={<Invoice/>}></Route>
          </Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Provider>
      </BrowserRouter>
    );
  }
}
export default App;
