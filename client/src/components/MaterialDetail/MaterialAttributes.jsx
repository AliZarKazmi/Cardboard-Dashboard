import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MaterialAttributes() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/material-details", { cache: "no-cache" })
      .then((result) => {
        const data = result.data;
        setProduct(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="dashboard-content" style={{ marginTop: "-20vh" }}>
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
            <tbody>
              {product.map((order, index) => (
                <tr key={index}>
                  <td>{order.materailName}</td>
                  <td> Rs. {order.paperRate}</td>
                  <td> Rs. {order.rollRate}</td>
                  <td> Rs. {order.gamrige}</td>
                  <td>
                    <Link
                      to={`update-material-Cost-Price/${order._id}`}
                      className="btn btn-info fw-semibold text-white"
                    >
                      Change Prices
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MaterialAttributes;
