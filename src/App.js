import { HashRouter as Router, Route, Routes } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import Layout from "./Page/Layout";
import Home from "./Page/Home";
import { SearchProvider } from "./Context/SearchContext";
import Detail from "./Page/Detail";
import { CartProvider } from "./Context/CartContext";
import Cart from "./Page/Cart";
import AddProduct from "./Page/AddProduct";
import OrderStatus from "./Page/OrderStatus";

export default function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <Router>
          <Layout />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/order-status/:id" element={<OrderStatus />} />
          </Routes>
        </Router>
      </SearchProvider>
    </CartProvider>
  );
}
