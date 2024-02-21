import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListBook from "./components/ListMyBook";
import Search from "./components/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListBook />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
