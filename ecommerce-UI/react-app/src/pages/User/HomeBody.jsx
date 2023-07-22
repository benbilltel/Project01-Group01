import React, { Component } from "react";

import { Button, Carousel } from "react-bootstrap";
import withRouter from "../../helpers/withRouter";
import "./HomeBody.css";
class HomeBody extends Component {
  render() {
    return (
      <div style={{ width: "100%", paddingBottom: "50px" }}>
        <Carousel>
          <Carousel.Item style={{ position: "relative" }}>
            <div className="carousel_caption">
              <span className="pulse">70% sale off</span>
              <h1>Furniture at cost</h1>
              <p>
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla.
              </p>
              <button className="gradient-button" onClick={()=>{
                this.props.toggleShowBody(false)
                const {navigate} = this.props.router
                navigate("/product")
              }}>More</button>
            </div>
            <img
              className="d-block"
              style={{ minHeight: "500px" }}
              src="../../../slider.png.webp"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item style={{ position: "relative" }}>
            <div className="carousel_caption">
              <span className="pulse">70% sale off</span>
              <h1>Furniture at cost</h1>
              <p>
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla.
              </p>
              <Button onClick={()=>{
               this.props.toggleShowBody(false)
               const {navigate} = this.props.router
               navigate("/product")
              }}>More</Button>
            </div>
            <img
              className="d-block"
              style={{ minHeight: "500px" }}
              src="../../../slider.png.webp"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item style={{ position: "relative" }}>
            <div className="carousel_caption">
              <span className="pulse">70% sale off</span>
              <h1>Furniture at cost</h1>
              <p>
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla.
              </p>
              <Button onClick={()=>{
                this.props.toggleShowBody(false)
                const {navigate} = this.props.router
                navigate("/product")
              }}>More</Button>
            </div>
            <img
              className="d-block"
              style={{ minHeight: "500px" }}
              src="../../../slider.png.webp"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
export default withRouter(HomeBody);
