import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, FormEvent } from "react";
import axios from "axios";
import { GROUPS, SERVER_URL, USER_ACTIONS } from "./constants";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post(`${SERVER_URL}/${GROUPS.USERS}/${USER_ACTIONS.REGISTER}`, {
        username,
        email,
        password,
      })
      .then((result) => {
        // console.log(result);
        if (result.data.id) {
          console.log("Registration Success");
          navigate("/login", {
            state: {
              message: "Registration successful! Please login to continue.",
            },
          });
        }
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center text-center"
      style={{
        backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))",
      }}
    >
      <Row className="w-100">
        <Col
          md={{ span: 6, offset: 3 }}
          lg={{ span: 4, offset: 4 }}
          className="bg-white p-3 rounded"
        >
          <h2 className="mb-3 text-primary">Register</h2>
          {message && <p className="text-danger">{message}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>
                <strong>Username</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label>
                <strong>Email Id</strong>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label>
                <strong>Password</strong>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Register
            </Button>
          </Form>

          <p className="container my-2">Already have an account?</p>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
