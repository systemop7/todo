import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="row">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className="d-flex justify-content-between align-items-center" key={id}>
            <p className="task__title">{title}</p>
            <div className="btn-container">
              <button type="button" className="btn btn-info btn-sm m-1" onClick={() => editItem(id)}><FaEdit /></button>
              <button type="button" className="btn btn-danger btn-sm m-1" onClick={() => removeItem(id)}><FaTrash /></button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
