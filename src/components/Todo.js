import React from "react";
import dump from "../images/icon-cross.svg";
import good from "../images/icon-check.svg";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const Todo = ({ todoText, isChecked, id }) => {
  const handleDeleteTodo = async (id) => {
    try {
      await deleteDoc(
        doc(db, "users", `${auth.currentUser.email}`, "todos", id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = async (id) => {
    try {
      await updateDoc(
        doc(db, "users", `${auth.currentUser.email}`, "todos", id),
        {
          isChecked: !isChecked,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditTodo = async (id) => {
    const updatedTodo = prompt("got a new name?");
    try {
      await updateDoc(
        doc(db, "users", `${auth.currentUser.email}`, "todos", id),
        {
          todoText: updatedTodo,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex px-4 items-center w-full space-x-3 justify-auto bg-white h-12 max-h-fit relative shadow-2xl hover:bg-gray-100">
      <div
        className="flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 via-blue-300 to-purple-400 w-5 h-5 cursor-pointer hover:from-purple-400 hover:to-blue-400"
        onClick={() => handleCheck(id)}
      >
        {isChecked && <img src={good} alt="" className="w-3" />}
      </div>
      <p className="text-gray-800 w-8/12 sm:w-9/12 truncate">{todoText}</p>
      <div className="flex space-x-2 items-center absolute right-4 w-fit">
      <p
        className=" px-2 py-1 border border-blue-600 rounded-md text-blue-600 text-xs font-semibold cursor-pointer"
        onClick={() => handleEditTodo(id)}
      >
        Edit
      </p>
      <img
        src={dump}
        onClick={() => handleDeleteTodo(id)}
        alt=""
        className="cursor-pointer"
      />
      </div>
      
    </div>
  );
};

export default Todo;
