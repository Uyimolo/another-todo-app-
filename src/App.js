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
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   setTimeout(() => {
  //     alert
  //   }, 3000);
  // }, [error]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          index
          element={
            <Todos
              user={user}
              setUser={setUser}
              error={error}
              setError={setError}
            />
          }
        />
        <Route
          path="/auth"
          element={
            <Auth
              user={user}
              setUser={setUser}
              error={error}
              setError={setError}
            />
          }
        />
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
