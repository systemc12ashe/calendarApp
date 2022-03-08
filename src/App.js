import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Calendar from "./components/Calendar";
import "./App.css";

function App() {
  return (
    <>
    {}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;