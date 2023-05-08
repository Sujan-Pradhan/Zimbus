import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
          {/* <Home />  */}
        </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
