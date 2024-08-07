import { Route, Routes, useRoutes } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="contacts" element={<Home />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
