import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import Auth from "./pages/login";
import AddMemory from "./pages/add-memory";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          exact
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/add-memory"
          element={
            <RequireAuth>
              <AddMemory />
            </RequireAuth>
          }
        />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Route>
      <Route exact path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
