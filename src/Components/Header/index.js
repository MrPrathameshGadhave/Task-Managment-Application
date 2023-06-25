import React, { useState, useEffect, useRef } from "react";
import Styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import dp from "../../Assets/dp.jpg";
import { Container, Row, Col } from "react-bootstrap";

function Header() {
  return (
    <>
      <header className="py-3 border-bottom  ">
        <Row>
          <Col sm={8}>
            <div className="d-flex pt-1 d-sm-block justify-content-center">
              <input
                type="text"
                autoComplete="off"
                name="text"
                className="input ms-4"
                placeholder="Search"
              />
              <div></div>
            </div>
          </Col>
          <Col sm={4}>
            <div className="align-items-center d-flex justify-content-center pt-3 pt-sm-0">
              <span
                className={`${Styles.calender} d-grid rounded-circle fs-4 bg-dark-subtle`}
              >
                <i className="fa-regular fa-calendar-days text-muted"></i>
              </span>
              <img
                src={dp}
                alt="..."
                className={`${Styles.dpimage} me-2 ms-4`}
              />
              <div className="pe-5">
                <span className="text-muted">Good Morning..</span>
                <br />
                <span className="fs-4 fw-medium profileName">Luffy Saii</span>
              </div>
              <div>
                <i className="fa-solid fa-arrows-up-down"></i>
              </div>
            </div>
          </Col>
        </Row>
      </header>
    </>
  );
}
export default Header;
