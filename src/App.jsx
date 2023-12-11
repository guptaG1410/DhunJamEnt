import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Admin from "./pages/Admin";

const App = () => {
  // const [authenticated, setAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (!loggedInUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Admin />
    </div>
  );
};
export default App;
