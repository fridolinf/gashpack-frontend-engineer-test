import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<MovieDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </header>
    </div>
  );
};

export default App;
