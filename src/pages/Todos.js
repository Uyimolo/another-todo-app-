import { useCallback, useEffect, useState } from "react";
import Todo from "../components/Todo";
import Header from "../components/Header";
//firebase
import { collection, onSnapshot } from "firebase/firestore";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import AddTodoForm from "../components/AddTodoForm";
import Filters from "../components/Filters";

const Todos = ({user, setUser}) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState([
    {
      isChecked: false,
      todoText: "Hello there, got some stuff for you to do 😏 ",
    },
    {
      isChecked: false,
      todoText: "First task : Create an account or sign to existing account",
    },
    {
      isChecked: false,
      todoText: "Second task : Plan your day",
    }
  ]);
  const [text, setText] = useState(null);
  const [menuActive, setMenuActive] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState("");
  const [todoListMain, setTodoListMain] = useState([])

  const handleFilters = useCallback(
    (fetchedTodos) => {
      if (filteredTodos === "completed") {
        setTodos(fetchedTodos.filter((todo) => todo.isChecked === true));
      } else if (filteredTodos === "uncompleted") {
        setTodos(fetchedTodos.filter((todo) => todo.isChecked !== true));
      } else {
        setTodos(fetchedTodos);
      }
    },
    [filteredTodos]
  );

  //check if user is logged in, fetch data and filter data
  useEffect(() => {
    const authUser = getAuth();
    onAuthStateChanged(authUser, (user) => {
      if (user) {
        setUser(auth.currentUser.email);
        onSnapshot(
          collection(db, "users", `${auth.currentUser.email}`, "todos"),
          (snapshot) => {
            const fetchedTodos = snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            setTodoListMain(fetchedTodos)
            //filters
            handleFilters(fetchedTodos);
          }
        );
      } 
      // else {
        
      // }
    });
  }, [filteredTodos, handleFilters, setUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null)
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
        user={user}
        menuActive={menuActive}
        handleLogout={handleLogout}
      />

      <AddTodoForm text={text} setText={setText} />
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
      {user && (
        <Filters todos={todoListMain}  setFilteredTodos={setFilteredTodos} />
      )}
    </div>
  );
};

export default Todos;
