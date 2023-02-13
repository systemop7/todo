import React, { useState, useEffect } from "react";
import List from "./components/List";
import "./App.css";
import toast, { Toaster } from 'react-hot-toast';

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      toast.error('This field is required!')
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      toast.success('task updated successfully!')
    } else {
      toast.success('task created successfully!')
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
    }
  };

  
  const clearList = () => {
    toast.success('All task deleted successfully!')
    setList([]);
  };
  const removeItem = (id) => {
    toast.success('task deleted successfully!')
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
          <div className="col-md-5">
          <div className="card">
            <div className="card-body">
            <form className="" onSubmit={handleSubmit}>
              <h3 className="text-center text-uppercase">Todo Application</h3>
              <div className="form-group d-flex">
                <input type="text" className="form-control mx-1" placeholder="Enter your task here" value={name} onChange={(e) => setName(e.target.value)} />
                <button type="submit" className="btn btn-info">{isEditing ? "update" : "Submit!"}</button>
              </div>
            </form>
            {list.length > 0 && (
              <div className="row">
                <List items={list} removeItem={removeItem} editItem={editItem} />
                <button className="btn btn-danger" onClick={clearList}>
                  clear all tasks
                </button>
              </div>
            )}
            <Toaster position="top-right"/>
            </div>
            
          </div>
          </div>
      </div>
    </div>
  );
}

export default App;
