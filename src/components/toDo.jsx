import React, { useEffect, useRef, useState } from "react";
import "../styles/main.css";

export default function ToDo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [list, setList] = useState([]);
  const [count, setCount] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("toDoList");
    if (saved) {
      setList(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("toDoList", JSON.stringify(list));
    }
  }, [list, isLoaded]);

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
      id: count,
      Created: currentTime,
      title: title,
      description: description,
      progress: "Started",
    };

    setList([...list, newItem]);
    setCount((count) => count + 1);
    setTitle("");
    setDescription("");
  };

  const editTask = () => {};

  const deleteTask = (id) => {
    if (window.confirm("Confirm Delete")) {
      setList(list.filter((task) => task.id !== id));
    }
  };
  const updateProgress = (id, value) => {
    setList(
      list.map((task) => (task.id === id ? { ...task, progress: value } : task))
    );
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
              <div className="heading">Modify</div>
            </div>
            {list.map((item) => {
              return (
                <div className="container__list--data" key={item.id}>
                  <div className="id">{item.id}</div>
                  <div className="created">{item.Created}</div>
                  <div className="title">
                    <b>{item.title}</b>
                    <br />
                    <br />
                    {item.description}
                  </div>
                  <div className="progress">
                    <select
                      name="progress__dropdown"
                      // id="progress__dropdown"
                      value={item.progress}
                      onChange={(e) => updateProgress(item.id, e.target.value)}
                    >
                      <option value="Started">Started</option>
                      <option value="InProgress">In-Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Incomplete">Incomplete</option>
                    </select>
                  </div>
                  <div className="modify">
                    <button>Edit</button>
                    <button onClick={() => deleteTask(item.id)}>Delete</button>
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
