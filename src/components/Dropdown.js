import menu from "../images/icon-menu.svg";
import { Link } from "react-router-dom";
// import { auth } from "../config/firebase"

const Dropdown = ({ setMenuActive, isLoggedOut, menuActive, handleLogout }) => {
  return (
    <div className="flex flex-col space-y-4 items-center relative pointer">
      <img
        src={menu}
        alt="menu button"
        onClick={() => setMenuActive(!menuActive)}
        className="w-8 cursor-pointer"
      />
      <div
        className={`max-w-sm ${
          menuActive ? "flex" : "hidden"
        } flex-col bg-slate-100  absolute top-6 right-0 z-20 overflow-hidden rounded-md shadow-2xl`}
      >
        <p className="text-gray-500 px-12 py-2 pointer hover:bg-blue-200">
          {/* {!isLoggedOut ? auth.currentUser.email : ""} */}
        </p>
        {isLoggedOut ? (
          <Link
            className="text-gray-500 px-12 py-2 pointer hover:bg-blue-200"
            to="/signin"
          >
            Signin
          </Link>
        ) : (
          <p
            className="text-red-500 px-12 py-2 hover:bg-blue-200"
            onClick={handleLogout}
          >
            Signout
          </p>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
