import moon from "../images/icon-moon.svg";
import Dropdown from "./Dropdown";

const Header = ({setMenuActive, isLoggedOut, menuActive, handleLogout}) => {
  return (
    <div className="py-8 px-6  h-48 bg-gradient-to-tr from-blue-100 via-blue-300 to-purple-300">
    <div className="flex justify-between items-center mx-auto">
      <h1 className="text-3xl text-blue-600 font-bold line-through tracking-widest lg:text-4xl">
        Todo App
      </h1>
      <div className="flex w-fit space-x-12 items-center">
        <img src={moon} alt="dark mode switch" className="cursor-pointer" />
        
        {/* drop down menu */}
        <Dropdown setMenuActive={setMenuActive} isLoggedOut={isLoggedOut} menuActive={menuActive} handleLogout={handleLogout} />
        {/* drop down menu end */}
      </div>
    </div>
  </div>
  )
}

export default Header
