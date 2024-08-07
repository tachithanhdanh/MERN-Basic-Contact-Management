import { useState, FormEvent, useEffect, useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { GROUPS, SERVER_URL, USER_ACTIONS } from "./constants";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setMessage(location.state.message);
    }
  }, [location]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        if (location.state) {
          location.state.message = "";
        }
    }, 10000); // Hide the message after 5 seconds
      return () => clearTimeout(timer); // Clear the timer if the component unmounts or message changes
    }
  }, [message]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.defaults.withCredentials = true;
    axios
      .post(`${SERVER_URL}/${GROUPS.USERS}/${USER_ACTIONS.LOGIN}`, {
        username,
        password,
      })
      .then((result) => {
        console.log(result);
        if (result.data.status === "success") {
          console.log("Login Success");
          localStorage.setItem("token", result.data.id);
          localStorage.setItem("username", username);
          navigate("/home");
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message);
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
          <h2 className="mb-3 text-primary">Login</h2>
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
              Login
            </Button>
          </Form>

          <p className="container my-2">Don&apos;t have an account?</p>
          <Link to="/register" className="btn btn-secondary">
            Register
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
