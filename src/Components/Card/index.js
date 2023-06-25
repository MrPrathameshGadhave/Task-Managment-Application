import React, { useState, useEffect, useRef } from "react";
import style from "./card.module.css";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const [elem, setElem] = useState();
  const [ind, setind] = useState();
  useEffect(() => {
    setElem(props.task);
    setind(props.ind);
  }, [props]);

  const handleDelete = () => {
    if (props.sorted) {
      props.deletedIndex(ind, true);
    } else {
      props.deletedIndex(ind);
    }
  };

  const handleDone = () => {
    if (props.sorted) {
      props.taskCompleted(ind, true);
    } else {
      props.taskCompleted(ind);
    }
  };

  return (
    <div className={`${style.card} p-2 position-relative`}>
      <div className={`${style.header}`}>
        <div>
          <a className={`${style.title}`} href="#">
            {elem?.title}
          </a>
          <p className={`${style.name}`}>{elem?.priority}</p>
        </div>
        {elem?.status == "done" ? (
          <span className={`${style.donesmg} p-1 position-absolute `}>completed Task</span>
        ) : (
          <button
            className={`${style.cssbuttonsiobutton} px-2`}
            onClick={(e) =>
              window.confirm("Are you sure you have completed the task")
                ? handleDone()
                : ""
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path d="M9 16.172l-3.536-3.536-1.414 1.414 5.95 5.95L20.95 7.636l-1.414-1.414z" />
            </svg>
            <span>Done</span>
          </button>
        )}

        <span className={`${style.image}`}></span>
      </div>
      <p className={`${style.description}`}>{elem?.discription}</p>
      <dl className={`${style.postinfo} mb-0`}>
        <div className={`${style.cr}`}>
          <dt className={`${style.dt}`}>Assigned</dt>
          <dd className={`${style.dd}`}>{elem?.start}</dd>
        </div>
        <div className={`${style.cr}`}>
          <dt className={`${style.dt}`}>Dead Line</dt>
          <dd className={`${style.dd}`}>{elem?.end}</dd>
        </div>
        <i
          className="fa-solid fa-trash-can fs-4 text-muted ps-4 align-self-end"
          onClick={(e) =>
            window.confirm("Are you sure you want to quite the Task")
              ? handleDelete()
              : ""
          }
          title="delete task"
        ></i>
      </dl>
    </div>
  );
}
export default Card;
