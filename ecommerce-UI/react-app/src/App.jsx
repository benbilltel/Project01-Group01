import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/User/Home";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import store from "./redux/store";
import { Provider } from "react-redux";
import withRouter from "./helpers/withRouter";
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
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </Provider>
      </BrowserRouter>
    );
  }
}
export default App;
