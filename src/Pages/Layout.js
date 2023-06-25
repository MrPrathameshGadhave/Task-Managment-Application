import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

const Layout = () => {
  return (
    <>
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
