import Login from "./components/login";
import Data from "./components/data";
import View from "./components/view";
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/AuthContex";
import AddUser from "./components/AddUsers";

function App() {
  const { currentUser } = useContext(AuthContext);
  // const currentUser = false;

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  console.log(currentUser);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Data />
          </RequireAuth>
        }
      />
      <Route
        path="/views"
        element={
          <RequireAuth>
            <View />
          </RequireAuth>
        }
      />
      <Route
        path="/add"
        element={
          <RequireAuth>
            <AddUser />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
