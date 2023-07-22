import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import withRouter from "../../helpers/withRouter";
class Footer extends Component {
  render() {
    return (
      <footer className="bg-dark text-light">
        <Container className="pt-4 pb-2">
          <Row>
            <Col md={4} className="mb-4">
              <h5>Connect with us:</h5>
              <ul className="list-unstyled">
                <li>
                  <a
                    href="https://twitter.com"
                    className="text-light"
                  >
                    <i className="fab fa-twitter fa-lg mr-2"></i>Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com"
                    className="text-light"
                  >
                    <i className="fab fa-facebook fa-lg mr-2"></i>Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com"
                    className="text-light"
                  >
                    <i className="fab fa-instagram fa-lg mr-2"></i>Instagram
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={4} className="mb-4">
              <h5>Navigation:</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" className="text-light">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-light">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-light">
                    Contact
                  </Link>
                </li>
              </ul>
            </Col>
            <Col md={4} className="mb-4">
              <h5>Contact us:</h5>
              <address className="text-light">
                1234 Main St,
                <br />
                Anytown, USA
                <br />
                <i className="fas fa-phone fa-lg mr-2"></i>555-555-5555
                <br />
                <i className="fas fa-envelope fa-lg mr-2"></i>info@mywebsite.com
              </address>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mt-4">
              <p>&copy; 2023 My Website, Inc.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default withRouter(Footer);
