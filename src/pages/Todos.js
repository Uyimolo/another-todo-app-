import { useCallback, useEffect, useState } from "react";
import Todo from "../components/Todo";
import Header from "../components/Header";
//firebase
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";

const Todos = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [todos, setTodos] = useState([
    {
      isChecked: false,
      todoText: "Please sign in to see your todos",
    },
  ]);
  const [text, setText] = useState(null);
  const [menuActive, setMenuActive] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState("");

  const handleAddTodos = async (e) => {
    e.preventDefault();
    try {
      if (text.length > 0) {
        await addDoc(
          collection(db, "users", `${auth.currentUser.email}`, "todos"),
          {
            todoText: text,
            isChecked: false,
          }
        );
        e.target.todoText.value = "";
        setText("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilters = useCallback(
    (fetchedTodos) => {
      if (filteredTodos === "completed") {
        setTodos(fetchedTodos.filter((todo) => todo.isChecked === true));
      } else if (filteredTodos === "uncompleted") {
        setTodos(fetchedTodos.filter((todo) => todo.isChecked !== true));
      } else {
        setTodos(fetchedTodos);
      }
      console.log("okay");
    },
    [filteredTodos]
  );

  //check if user is logged in, fetch data and filter data
  useEffect(() => {
    const authUser = getAuth();
    onAuthStateChanged(authUser, (user) => {
      if (user) {
        setIsLoggedOut(false);
        onSnapshot(
          collection(db, "users", `${auth.currentUser.email}`, "todos"),
          (snapshot) => {
            const fetchedTodos = snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            //filters
            handleFilters(fetchedTodos);
          }
        );
      } else {
        setIsLoggedOut(true);
      }
    });
  }, [filteredTodos, handleFilters]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setTodos([
        {
          isChecked: false,
          todoText: "Please sign in to see your todos",
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100">
      <Header
        setMenuActive={setMenuActive}
        isLoggedOut={isLoggedOut}
        menuActive={menuActive}
        handleLogout={handleLogout}
      />
      {/* todo input */}
      <form
        onSubmit={(e) => handleAddTodos(e)}
        className=" px-6 flex items-center mb-6 space-x-2 max-w-2xl mx-auto -translate-y-24"
      >
        <input
          type="text"
          name="todoText"
          id="todotext"
          className="px-12 w-11/12 text-sm h-12 rounded-md"
          placeholder="What are we doing today..."
          s
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 py-3 px-6 rounded-md text-gray-200 hover:bg-blue-500"
        >
          Add
        </button>
      </form>
      <div className="px-6 flex flex-col space-y-2 max-w-2xl mx-auto -translate-y-24">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            isChecked={todo.isChecked}
            todoText={todo.todoText}
            id={todo.id}
          />
        ))}
      </div>
      {/* filters */}
      <div className="flex px-8 justify-between items-center max-w-2xl mx-auto bg-white -translate-y-16 shadow-2xl py-3">
        <p
          onClick={() => setFilteredTodos("all")}
          className="cursor-pointer text-gray-500 text-sm font-semibold hover:text-blue-600"
        >
          All ({`${todos.length === 0 ? "None" : todos.length}`})
        </p>
        <p
          onClick={() => setFilteredTodos("completed")}
          className="cursor-pointer text-gray-500  text-sm font-semibold hover:text-blue-600"
        >
          Completed (
          {`${
            todos.filter((todo) => todo.isChecked).length === 0
              ? "None"
              : todos.filter((todo) => todo.isChecked).length
          }`}
          )
        </p>
        <p
          onClick={() => setFilteredTodos("uncompleted")}
          className="cursor-pointer text-gray-500  text-sm font-semibold hover:text-blue-600"
        >
          Not Completed (
          {`${
            todos.filter((todo) => !todo.isChecked).length === 0
              ? "None"
              : todos.filter((todo) => !todo.isChecked).length
          }`}
          )
        </p>
      </div>
    </div>
  );
};

export default Todos;
