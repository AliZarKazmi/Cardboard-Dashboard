import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SideBar from "./components/Sidebar";
import sidebar_menu from "./constants/sidebar-menu";

import "./App.css";
import Orders from "./pages/Orders/index.jsx";
import Product from "./components/Product/Product";
import Edit from "./components/Product/EditFrom/Edit";
import OrderDetail from "./pages/Orders/OrderDetails";

import CostChange from "./components/Costs/CostChange";

import MaterialCostChange from "./components/MaterialDetail/MaterialCostChange";
import ManagePrice from "./pages/ManagePrice";
import Rolls from "./components/Rolls/Rolls";
import EditRolls from "./components/Rolls/EditRolls";
import Reels from "./components/Reels/Reels";
import EditReels from "./components/Reels/EditReels";
import StockInRolls from "./components/Rolls/StockInRolls";
import StockOutRolls from "./components/Rolls/StockOut";

function App() {
  return (
    <Router>
      <div className="dashboard-container">
        <SideBar menu={sidebar_menu} />

        <div className="dashboard-body">
          <Routes>
            {/* <Route exact path="/" element={<CostAttributes/>} /> */}
            <Route path="/" element={<ManagePrice />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cardboard-products" element={<Product />} />
            <Route path="/update/:id" element={<Edit />}></Route>
            <Route path="/orderDetails/:id" element={<OrderDetail />}></Route>
            <Route
              path="/update-Cost-Price/:id"
              element={<CostChange />}
            ></Route>
            <Route
              path="/update-material-Cost-Price/:id"
              element={<MaterialCostChange />}
            ></Route>
            <Route path="/roll-products" element={<Rolls />} />
            <Route path="/update-rolls/:id" element={<EditRolls />} />
            <Route path="/stock-in-rolls" element={<StockInRolls />} />
            <Route path="/stock-out-rolls" element={<StockOutRolls />} />
            <Route path="/reel-products" element={<Reels />} />
            <Route path="/update-reels/:id" element={<EditReels />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
