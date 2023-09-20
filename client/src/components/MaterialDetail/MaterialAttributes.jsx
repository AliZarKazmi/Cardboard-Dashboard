import axios from "axios";
import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import {Link} from 'react-router-dom'

// import "./styles.css";


function MaterialAttributes() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/material-details",{"cache" :"no-cache"})
      .then((result) => setProduct(result.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="New Order" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Material Attributes</h2>
           
        </div>

        <table>
          <thead>
            <th>Material Name</th>
            <th>Paper Rate</th>
            <th>Roll Rate</th>
            <th>Gamrige</th>
            <th>Action</th>
          </thead>

          <tbody >
            {product.map((order, index) => (
              <tr key={index}>
                <td>{order.materailName}</td>
                <td> $ {order.paperRate}</td>
                <td> $ {order.rollRate}</td>
                <td> $ {order.gamrige}</td>  
                <td>
                  <Link to={`update-Cost-Price/${order._id}`} className="btn btn-success">
                    Change Prices
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

export default MaterialAttributes;
