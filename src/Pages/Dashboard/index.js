import React, { useState, useEffect, useRef } from "react";
import style from "./dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import Progress from "../../Components/Progress";
import Card from "../../Components/Card";

function Dashboard(props) {

  const navigate = useNavigate();
  useEffect(() => {
    if (props.isLogin == false) {
      navigate("/", { replace: true });
    }
  }, [props.isLogin]);

  const [taskno, seTaskno] = useState(2);
  const [dumy, setdumy] = useState([]);
  const [sortedtask, setsortedtask] = useState([]);
  const [up, setup] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [startDate, setStartDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [tasks, settasks] = useState([]);

  const currentDate = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  useEffect(() => {
    setsortedtask([...tasks]);
    setdumy([...tasks]);
  }, [tasks]);

  const [newTask, setNewtask] = useState({
    title: "",
    discription: "",
    start: new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }),
    end: "",
    status: "new",
    priority: "",
  });

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };
  const HandlechangeTask = (e) => {
    const arr = { ...newTask, [e.target.name]: e.target.value };
    setNewtask(arr);
  };

  const handleSubmit = (e) => {
    if (
      newTask.title == "" ||
      newTask.priority == "" ||
      newTask.end == "" ||
      newTask.discription == ""
    ) {
      alert("fill all information");
    } else {
      const arr = [...tasks];
      arr.unshift(newTask);
      console.log(arr);
      arr.map((task, ind) => {
        if (task.end < currentDate && task.status !== "done") {
          arr[ind] = { ...task, status: "pending" };
        }
      });
      settasks(arr);
      handleClose();
    }
  };

  const priorityMap = {
    low: 1,
    medium: 2,
    high: 3,
  };

  const handleClick = () => {
    if (up) {
      seTaskno(tasks.length - 1);
      setup(false);
    } else {
      seTaskno(2);
      setup(true);
    }
  };

  const deletedIndex = (ind, sorted) => {
    const newArray = [...tasks];
    if (sorted) {
      const newind = tasks.findIndex((elem) => elem === sortedtask[ind]);
      newArray.splice(newind, 1);
      settasks(newArray);
    } else {
      newArray.splice(ind, 1);
      settasks(newArray);
    }
  };

  const taskCompleted = (ind, sorted) => {
    const newArray = [...tasks];
    if (sorted) {
      const newind = tasks.findIndex((elem) => elem === sortedtask[ind]);
      newArray[newind].status = "done";
      settasks(newArray);
    } else {
      newArray[ind].status = "done";
      settasks(newArray);
    }
  };

  // const changepengingstatus=(ind)=>{
  //   const newArray = [...tasks];
  //   newArray[ind].status = "pending";
  //   settasks(newArray);
  // }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form action="#" encType="multipart/form-data" method="post">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task Title"
                name="title"
                autoFocus
                onChange={(e) => {
                  HandlechangeTask(e);
                }}
                required
              />
            </Form.Group>

            <Form.Label>Task priority </Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="priority"
              onChange={(e) => {
                HandlechangeTask(e);
              }}
              required
            >
              <option>select priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Form.Select>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Task Discription</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="discription"
                onChange={(e) => {
                  HandlechangeTask(e);
                }}
                required
              />
            </Form.Group>
            <Form.Label>Deadline .</Form.Label>
            <DatePicker
              showTimeSelect
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                var arr = {
                  ...newTask,
                  end: startDate.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                  }),
                };
                setNewtask(arr);
              }}
              timeClassName={handleColor}
              required
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) =>
              window.confirm("Are you sure you to add new task")
                ? handleSubmit()
                : ""
            }
          >
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
      <main className="bg-body-secondary py-3 h-100">
        <div className="bg-body container rounded-5 border-end shadow">
          <Row>
            <Col sm={2} className="rounded-5  border-right shadow">
              <Sidebar />
            </Col>
            <Col sm={10}>
              <Header />
              <div>
                <Row>
                  <Col sm={8}>
                    <section>
                      <div className="pt-4 pb-2">
                        <span className="fs-3  fw-bold">Latest Task</span>
                        <span
                          className="text-primary float-end"
                          onClick={handleClick}
                        >
                          {up ? `See all` : `show less`}
                        </span>
                      </div>
                      <Row>
                        {tasks.map((elem, ind) => {
                          if (ind <= taskno) {
                            return (
                              <Col sm={4} key={ind} className="p-1 mt-3">
                                <Card
                                  task={elem}
                                  ind={ind}
                                  deletedIndex={deletedIndex}
                                  taskCompleted={taskCompleted}
                                />
                              </Col>
                            );
                          }
                        })}
                      </Row>
                      <div className="pt-2 d-flex justify-content-between">
                        <span className="fs-3  fw-bold">My Tasks</span>
                        <span>
                          <button
                            className={`${style.continueapplication}`}
                            onClick={handleShow}
                          >
                            <div>
                              <div className={`${style.pencil}`}></div>
                              <div className={`${style.folder}`}>
                                <div className={`${style.top}`}>
                                  <svg viewBox="0 0 24 27">
                                    <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                                  </svg>
                                </div>
                                <div className={`${style.paper}`}></div>
                              </div>
                            </div>
                            Add Task
                          </button>
                        </span>
                      </div>
                      <Tabs
                        defaultActiveKey="home"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                      >
                        <Tab eventKey="home" title="Ongoing">
                          <Row>
                            {sortedtask
                              .sort(
                                (a, b) =>
                                  priorityMap[b.priority] -
                                  priorityMap[a.priority]
                              )
                              .map((elem, ind) => {
                                if (elem.status == "new") {
                                  return (
                                    <Col sm={4} key={ind} className="p-1 mt-3">
                                      <Card
                                        task={elem}
                                        ind={ind}
                                        deletedIndex={deletedIndex}
                                        taskCompleted={taskCompleted}
                                        sorted={true}
                                      />
                                    </Col>
                                  );
                                }
                              })}
                          </Row>
                        </Tab>

                        <Tab eventKey="contact" title="Pending">
                          <Row>
                            {tasks.map((elem, ind) => {
                              if (elem.status == "pending") {
                                return (
                                  <Col sm={4} key={ind} className="p-1 mt-3">
                                    <Card
                                      task={elem}
                                      ind={ind}
                                      deletedIndex={deletedIndex}
                                      taskCompleted={taskCompleted}
                                    />
                                  </Col>
                                );
                              }
                            })}
                          </Row>{" "}
                        </Tab>
                        <Tab eventKey="done" title="Completed">
                          <Row>
                            {tasks.map((elem, ind) => {
                              if (elem.status == "done") {
                                return (
                                  <Col sm={4} key={ind} className="p-1 mt-3">
                                    <Card
                                      task={elem}
                                      ind={ind}
                                      deletedIndex={deletedIndex}
                                      taskCompleted={taskCompleted}
                                    />
                                  </Col>
                                );
                              }
                            })}
                          </Row>{" "}
                        </Tab>
                      </Tabs>
                    </section>
                  </Col>
                  <Col sm={4}>
                    <Progress />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
}
export default Dashboard;
