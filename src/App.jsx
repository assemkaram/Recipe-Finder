import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/layouts/NavBar";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route
          path="*"
          element={<p className="p-8 text-center">not found</p>}
        />
      </Routes>
    </>
  );
}

export default App;
