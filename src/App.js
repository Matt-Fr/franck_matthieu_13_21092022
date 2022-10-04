import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import User from "./pages/User";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Signin />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
