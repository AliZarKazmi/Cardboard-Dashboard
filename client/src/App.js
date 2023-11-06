import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Orders from './pages/Orders/index.jsx';
import Product from './components/Product/Product';
import Edit from './components/Product/EditFrom/Edit';
import OrderDetail from './pages/Orders/OrderDetails';
import CostAttributes from './components/Costs/CostAttributes';
import CostChange from './components/Costs/CostChange';
import MaterialAttributes from './components/MaterialDetail/MaterialAttributes';
import MaterialCostChange from './components/MaterialDetail/MaterialCostChange';
import ManagePrice from './pages/ManagePrice';
import CanvasContainer from './components/Canvas3D/CanvasContainer';

import Rolls from "./components/Rolls/Rolls";
import EditRolls from "./components/Rolls/EditRolls";
import StockInRolls from "./components/Rolls/StockInRolls";
import StockOutRolls from "./components/Rolls/StockOut";

import Reels from "./components/Reels/Reels";
import EditReels from "./components/Reels/EditReels";
import ReelsStockIn from "./components/Reels/ReelsStockIn";
import StockOut from "./components/Reels/StockOut";

import StockHistory from "./components/StockHistory/StockHistory";

function App() {
  return (
    <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />

        <div className='dashboard-body'>
          <Routes>
            <Route path="/" element={<ManagePrice />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Product />} />
            <Route path="/scene" element={<CanvasContainer />} />
            <Route path='/update/:id' element={<Edit />}></Route>
            <Route path='/orderDetails/:id' element={<OrderDetail />}></Route>
            <Route path='update-Cost-Price/:id' element={<CostChange />}></Route>
            <Route path='update-material-Cost-Price/:id' element={<MaterialCostChange />}></Route>
            <Route path="/roll-products" element={<Rolls />} />
            <Route path="/update-rolls/:id" element={<EditRolls />} />
            <Route path="/stock-in-rolls" element={<StockInRolls />} />
            <Route path="/stock-out-rolls" element={<StockOutRolls />} />
            <Route path="/reel-products" element={<Reels />} />
            <Route path="/update-reels/:id" element={<EditReels />} />
            <Route path="/stock-in-reels" element={<ReelsStockIn />} />
            <Route path="/stock-out-reels" element={<StockOut />} />
            <Route path="/stock-history" element={<StockHistory />} />
            <Route path="/profile" element={<div></div>} />
            <Route path="*" element={
              <div className=' p-lg-5'>
                <h1>404 Page not found</h1>
                <button className=' btn btn-info'>Go back to home page</button>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;