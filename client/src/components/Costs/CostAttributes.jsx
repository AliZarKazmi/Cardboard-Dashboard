import axios from "axios";
import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import {Link} from 'react-router-dom'

// import "./styles.css";


function CostAttributes() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/cost-Info",{"cache" :"no-cache"})
      .then((result) => setProduct(result.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="New Order" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Cost Estimaton Attributes</h2>
           
        </div>

        <table>
          <thead>
            <th>Labour</th>
            <th>Rent</th>
            <th>Printed Sides</th>
            <th>Action</th>
          </thead>

          <tbody >
            {product.map((order, index) => (
              <tr key={index} style={{marginLeft:"80px"}}>
                <td> $ {order.labor}</td>
                <td> $ {order.rent}</td>
                <td> $ {order.printedSides}</td> 
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

export default CostAttributes;
