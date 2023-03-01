import menu from "../images/icon-menu.svg";
import { Link } from "react-router-dom";

const Dropdown = ({ setMenuActive, user, menuActive, handleLogout }) => {
  return (
    <div className="flex flex-col space-y-4 relative pointer">
      <img
        src={menu}
        alt="menu button"
        onClick={() => setMenuActive(!menuActive)}
        className="w-8 cursor-pointer"
      />
      <div
        className={` ${
          menuActive ? "flex" : "hidden"
        } flex-col bg-slate-100 absolute top-6 right-0 left-auto overflow-hidden z-20 rounded-md shadow-xl shadow-gray-400`}
      >
        <p className="text-gray-500 py-3 px-6 pointer max-w-36 whitespace-pre hover:bg-blue-200">
          {user ? `Signed in as:\n${user}` : "Currently signed out"}
        </p>
        {user ? (
          <p
            className="text-red-500 px-6 py-3 hover:bg-blue-200"
            onClick={handleLogout}
          >
            Sign out
          </p>
        ) : (
          <Link
            className="text-gray-500 px-6 py-3 pointer hover:bg-blue-200"
            to="/Auth"
          >
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
