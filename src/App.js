
import { Fragment, useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,
   Routes,
   Route,
   Navigate
} from "react-router-dom";
//components
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";




function App() {

  const [isAuth,setIsAuth] = useState(false);
  const [message,setMessage] = useState('');
  const setAuth = boolean => {
    setIsAuth(boolean)
  }

  async function checkAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify",
        {
          method: "Get",
          headers: { token: localStorage.token }
        }
      );
      const parseResponse = await response.json();
      parseResponse === true ? setAuth(true) : setAuth(false);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    checkAuth();
  },[])

  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route exact path="/login" element={!isAuth ? <Login setAuth ={setAuth}/> : <Navigate to = "/dashboard"/>} />
            <Route exact path="/register"  element={!isAuth ? <Register setAuth ={setAuth} /> : <Navigate to = "/login"/>} />
            <Route exact path="/dashboard"  element={isAuth ? <Dashboard setAuth ={setAuth}/> : <Navigate to = "/login"/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
