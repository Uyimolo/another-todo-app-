const Filters = ({ todos, setFilteredTodos }) => {
  return (
    <div className="flex px-8 justify-between items-center max-w-2xl mx-auto bg-white -translate-y-16 shadow-2xl py-3">
      <p
        onClick={() => setFilteredTodos("all")}
        className="cursor-pointer text-gray-500 text-sm font-semibold hover:text-blue-600"
      >
        All ({`${todos.length}`})
      </p>
      <p
        onClick={() => setFilteredTodos("completed")}
        className="cursor-pointer text-gray-500  text-sm font-semibold hover:text-blue-600"
      >
        Completed ({`${todos.filter((todo) => todo.isChecked).length}`})
      </p>
      <p
        onClick={() => setFilteredTodos("uncompleted")}
        className="cursor-pointer text-gray-500  text-sm font-semibold hover:text-blue-600"
      >
        Not Completed ({`${todos.filter((todo) => !todo.isChecked).length}`})
      </p>
    </div>
  );
};

export default Filters;
