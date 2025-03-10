import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Category from "./Category/Category";
import Item from "./Item/Item";
import Expense from "./Expense/Expense";
import Home from "./Home/Home";

function App() {
  return (
    <>
      <h1>Expense Tracker</h1>

      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/category">Categories</Link>
          </li>
          <li>
            <Link to="/item">Items</Link>
          </li>
          <li>
            <Link to="/expense">Expenses</Link>
          </li>
        </ul>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/item" element={<Item />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
