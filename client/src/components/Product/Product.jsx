import axios from "axios";
import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import {Link} from 'react-router-dom'

import "./styles.css";


function Product() {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((result) => setProduct(result.data))
      .catch((error) => console.log(error));
  }, []);

  // Search
  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let search_results = product.filter(
        (item) =>
          item.first_name.toLowerCase().includes(search.toLowerCase()) ||
          item.last_name.toLowerCase().includes(search.toLowerCase()) ||
          item.product.toLowerCase().includes(search.toLowerCase())
      );
      setProduct(search_results);
    }
  };

  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="New Order" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Product List</h2>
          <div className="dashboard-content-search">
            <input
              type="text"
              value={search}
              placeholder="Search.."
              className="dashboard-content-input"
              onChange={(e) => __handleSearch(e)}
            />
          </div>
        </div>

        <table>
          <thead>
            <th>Image</th>
            <th>Product Name</th>
            <th>L x W x D(inc)</th>
            <th>Rate ($)</th>
            <th>Quantity</th>
            <th>Action</th>
          </thead>

          <tbody>
            {product.map((order, index) => (
              <tr key={index}>
                <td>
                  <div>
                    <img
                      src={order.img}
                      alt="paid-icon"
                      className="dashboard-content-icon"
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                  </div>
                </td>
                <td>{order.cardboardname}</td>
                <td>{order.length} x {order.width} x {order.depth}</td>
                <td>{order.rate}</td>
                <td>{order.quantity}</td>
                <td>
                  <Link to={`/update/${order._id}`} className="btn btn-success">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Product;
