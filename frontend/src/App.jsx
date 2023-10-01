import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Header />
      <Toaster />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default App;
