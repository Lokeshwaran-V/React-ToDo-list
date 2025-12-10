import React, { useState } from "react";
import "../styles/main.css";

export default function toDo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [list, setList] = useState([]);

  const add = () => {
    const dateFormat = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const currentTime = new Date().toLocaleString("en-GB", dateFormat);

    if (!title.trim()) return alert("Title cannot be empty");
    let newItem = {
      id: list.length + 1,
      Created: currentTime,
      title: title,
      description: description,
    };

    setList([newItem, ...list]);

    setTitle("");
    setDescription("");
  };

  const editTask = () => {};

  const deleteTask = (id) => {
    setList(list.filter((task) => task.id !== id));
  };

  return (
    <>
      <div className="container">
        <div className="container__top">
          <div className="container__title">
            <h1>To Do List</h1>
          </div>
          <div className="container__inputs">
            <div className="container__inputs--inputfield">
              <input
                type="text"
                placeholder="Enter your task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                id="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <button onClick={add}>Add</button>
            </div>
          </div>
        </div>
        <div className="container__bottom">
          <div className="container__list">
            <div className="container__list--title">
              <div className="heading">Item</div>
              <div className="heading">Created</div>
              <div className="heading">Title - Description</div>
              <div className="heading">Progress</div>
              <div className="heading">Modi</div>
            </div>
            {list.map((item) => {
              return (
                <div className="container__list--data">
                  <div className="id">{item.id}</div>
                  <div className="created">{item.Created}</div>
                  <div className="title">
                    <b>{item.title}</b>
                    <br />
                    {item.description}
                  </div>
                  <div className="progress">
                    <select name="progress__dropdown" id="progress__dropdown">
                      <option value="Started">Started</option>
                      <option value="In-Progress">In-Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Incomplete">Incomplete</option>
                    </select>
                  </div>
                  <div className="modify">
                    <button>Edit</button>
                    <button onClick= {deleteTask}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
