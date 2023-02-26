import Register from "./pages/Register";
import Todos from "./pages/Todos";
import Login from "./pages/Login";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={ <Todos />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
    </Route>
  )
);
function App() {
  return (
    <div className="w-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
