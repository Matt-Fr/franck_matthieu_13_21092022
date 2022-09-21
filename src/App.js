import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />}></Route>
          {/* <Route path="profil" element={<Profil />}></Route>
          <Route path="/user/:id" element={<Profil />}></Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
