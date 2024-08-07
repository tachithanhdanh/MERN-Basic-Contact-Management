import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { GROUPS, SERVER_URL, USER_ACTIONS } from "./constants";
import { Link } from "react-router-dom";

export default function Home() {
  const [auth, setAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errorTitle, setErrorTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/${GROUPS.USERS}/${USER_ACTIONS.PROFILE}`)
      .then((result) => {
        if (result.data.username) {
          setAuth(true);
          setUsername(result.data.username);
          setEmail(result.data.email);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrorTitle(error.response.data.title);
        setErrorMessage(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="justify-content-center align-items-center text-center">
      {auth ? (
        <LoggedInHome username={username} email={email} />
      ) : (
        <>
          <h1>Not Authorized</h1>
          <p>Please login to continue</p>
          <Link to="/login">
            <Button className="mt-2" variant="primary">
              Login
            </Button>
          </Link>
        </>
      )}
    </Container>
  );
}

type LoggedInHomeProps = {
  username: string;
  email: string;
};

function LoggedInHome({ username, email }: LoggedInHomeProps) {
  function handleLogout() {
    axios
      .get(`${SERVER_URL}/${GROUPS.USERS}/${USER_ACTIONS.LOGOUT}`)
      .then(() => {
        location.reload();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  return (
    <>
      <h1>Welcome {username}</h1>
      <p>Email: {email}</p>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}

type NotLoggedInHomeProps = {
  errorTitle: string;
  errorMessage: string;
};

function NotLoggedInHome({ errorTitle, errorMessage }: NotLoggedInHomeProps) {
  return (
    <>
      <h1 className="text-danger fw-bold">{errorTitle}</h1>
      <p className="text-danger fw-bold">{errorMessage}</p>
      <Link to="/login">
        <Button variant="primary">Login</Button>
      </Link>
    </>
  );
}
