import React from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  Card,
  Form,
  InputGroup,
} from 'react-bootstrap';
import Slider from 'react-slick';

// Sample product data
const products = [
  {
    id: 1,
    title: 'Wireless Headphones',
    price: '$99.99',
    img: 'https://images.unsplash.com/photo-1512499617640-c2f9992f0b3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Smart Watch',
    price: '$199.99',
    img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'DSLR Camera',
    price: '$499.99',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    title: 'Gaming Console',
    price: '$299.99',
    img: 'https://images.unsplash.com/photo-1587202372775-0a3a7a1a3f3a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    title: 'Bluetooth Speaker',
    price: '$59.99',
    img: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    title: 'Laptop',
    price: '$899.99',
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
  },
];

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Verified Buyer',
    text: 'Amazing products and fast delivery! Highly recommend this store.',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Mark Wilson',
    role: 'Happy Customer',
    text: 'Great customer service and quality products. Will shop again!',
    img: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    id: 3,
    name: 'Sophia Lee',
    role: 'Loyal Client',
    text: 'The best e-commerce experience I have had so far. Five stars!',
    img: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

// Slick slider settings
const productSliderSettings = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 992, settings: { slidesToShow: 2 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } },
  ],
};

const testimonialSliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 7000,
  arrows: false,
};

const EcommerceHomePage = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" fixed="top" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-primary">
            E-Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center gap-3">
              <Button as={Link} to="/signin" variant="outline-primary">
                Sign In
              </Button>
              <Button as={Link} to="/signup" variant="primary">
                Sign Up
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section
        className="d-flex align-items-center"
        style={{
          minHeight: '80vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          paddingTop: '5rem',
          paddingBottom: '5rem',
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 fw-bold mb-4">
                Discover the Best Products at Unbeatable Prices
              </h1>
              <p className="lead mb-4">
                Shop from a wide range of electronics, gadgets, and accessories with fast shipping and great customer support.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Button as={Link} to="/signup" size="lg" variant="light">
                  Sign Up
                </Button>
                <Button as={Link} to="/signin" size="lg" variant="outline-light">
                  Sign In
                </Button>
              </div>
            </Col>
            <Col md={6}>
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
                alt="E-commerce hero"
                className="img-fluid rounded shadow-lg"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="mb-4 text-center fw-bold">Featured Products</h2>
          <Slider {...productSliderSettings}>
            {products.map(({ id, title, price, img }) => (
              <div key={id} className="px-3">
                <Card className="h-100 shadow-sm border-0 rounded-4">
                  <Card.Img
                    variant="top"
                    src={img}
                    alt={title}
                    className="rounded-top-4"
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-5">{title}</Card.Title>
                    <Card.Text className="text-primary fw-semibold fs-5">{price}</Card.Text>
                    <Button variant="primary" className="mt-auto rounded-pill">
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Slider>
        </Container>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-5">
        <Container>
          <h2 className="mb-4 text-center fw-bold">What Our Customers Say</h2>
          <Slider {...testimonialSliderSettings}>
            {testimonials.map(({ id, name, role, text, img }) => (
              <div key={id} className="px-3">
                <Card className="shadow-sm text-center p-4 rounded-4">
                  <img
                    src={img}
                    alt={name}
                    className="rounded-circle mx-auto mb-3"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Text className="fst-italic fs-5">"{text}"</Card.Text>
                    <Card.Subtitle className="mt-3 fw-bold fs-6">{name}</Card.Subtitle>
                    <Card.Text className="text-muted">{role}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Slider>
        </Container>
      </section>

      {/* Newsletter & Footer */}
      <footer className="bg-dark text-light pt-5 pb-3">
        <Container>
          <Row className="mb-4">
            <Col md={6}>
              <h5>Subscribe to our Newsletter</h5>
              <Form className="d-flex mt-3" onSubmit={(e) => e.preventDefault()}>
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    aria-label="Email address"
                    required
                  />
                  <Button variant="primary" type="submit" className="rounded-end-pill">
                    Subscribe
                  </Button>
                </InputGroup>
              </Form>
            </Col>
            <Col
              md={6}
              className="d-flex align-items-center justify-content-md-end mt-4 mt-md-0"
            >
              <Nav>
                <Nav.Link as={Link} to="/privacy-policy" className="text-light px-3">
                  Privacy Policy
                </Nav.Link>
                <Nav.Link as={Link} to="/terms-of-service" className="text-light px-3">
                  Terms of Service
                </Nav.Link>
                <Nav.Link as={Link} to="/contact" className="text-light px-3">
                  Contact Us
                </Nav.Link>
              </Nav>
            </Col>
          </Row>
          <hr className="border-light" />
          <p className="text-center mb-0">&copy; 2024 E-Shop. All rights reserved.</p>
        </Container>
      </footer>
    </>
  );
};

export default EcommerceHomePage;
