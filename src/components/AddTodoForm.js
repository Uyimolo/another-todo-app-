import { auth, db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

const AddTodoForm = ({ setText, text }) => {
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
  return (
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
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 py-3 px-6 rounded-md text-gray-200 hover:bg-blue-500"
        >
          Add
        </button>
      </form>
  )
}

export default AddTodoForm
