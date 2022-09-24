import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import User from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/profile" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
