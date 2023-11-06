import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'


function CostAttributes() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/cost-Info",{"cache" :"no-cache"})
      .then((result) => setProduct(result.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="dashboard-content">


      <div className="dashboard-content-container"  style={{marginTop:"5vh"}}>
        <div className="dashboard-content-header">
          <h2>Cost Estimation Attributes</h2>
           
        </div>

        <table>
          <thead>
            <th>Labour</th>
            <th>Rent</th>
            <th>Printed Sides</th>
            <th>Image Printed Side</th>
            <th>Action</th>
          </thead>

          <tbody >
            {product.map((order, index) => (
              <tr key={index} style={{marginLeft:"80px"}}>
                <td> Rs. {order.labor}</td>
                <td> Rs. {order.rent}</td>
                <td> Rs. {order.printedSides}</td> 
                <td> Rs. {order.imagePrintedSide}</td> 
                <td>
                  <Link to={`update-Cost-Price/${order._id}`} className="btn btn-info fw-semibold text-white">
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
