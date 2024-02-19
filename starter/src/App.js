import { Route, Routes } from "react-router-dom";
import "./App.css";
import ListBook from "./components/ListMyBook";
import Search from "./components/Search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListBook />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
