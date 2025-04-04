import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Category from "./Category/Category";
import Item from "./Item/Item";
import Expense from "./Expense/Expense";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import "./NavLink.css";

function App() {
  return (
    <>
      <Router>
        <div className="nav_container">
          <h1>Expense Tracker</h1>
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
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
          </ul>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/item" element={<Item />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
