import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Calendar from "./components/Calendar";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
    {}
    
    <BrowserRouter> 
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route
            path="/Calendar" 
            element={<PrivateRoute>
              <Calendar />
            </PrivateRoute>}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    
    </>
  );
}

export default App;