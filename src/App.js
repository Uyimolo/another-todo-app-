import Todos from "./pages/Todos";
import Auth from "./pages/Auth";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useState } from "react";



function App() {
const [user, setUser] = useState(null)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<Todos user={user} setUser={setUser} />} />
        <Route path="/auth" element={<Auth user={user} setUser={setUser}/>} />
      </Route>
    )
  );
  return (
    <div className="w-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
