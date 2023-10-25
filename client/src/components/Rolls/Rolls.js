import axios from "axios";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import "./rolls.css"; // Import your CSS file
import EditRolls from "./EditRolls";

function Rolls() {
  const [roll, setRoll] = useState([]);
  const [selectedData, setSelectedData] = useState({
    typeName: "",
    rate: 0,
    size: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/rolls", { cache: "no-cache" })
      .then((result) => setRoll(result.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSizeChange = (event, index) => {
    const selectedSize = roll[index];
    setSelectedData({
      typeName: selectedSize.Type,
      rate: selectedSize.Rate,
      size: event.target.value,
    });
    console.log("Selected Type Name:", selectedSize.Type);
  console.log("Selected Rate:", selectedSize.Rate);
  console.log("Selected Size:", event.target.value);
  };

  return (
    <div className="dashboard-content">
      <div className="dashboard-content-container" style={{ marginTop: "5vh" }}>
        <div className="dashboard-content-header">
          <h2>Rolls Attributes</h2>
        </div>

        <table>
          <thead>
            <tr>
              <th>Type Name</th>
              <th>Rate</th>
              <th>Size</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {roll.map((rollData, index) => (
              <tr key={index}>
                <td> {rollData.Type}</td>
                <td> Rs {rollData.Rate}</td>
                <td >
                  <select onChange={(e) => handleSizeChange(e, index)} >
                    <option value="">Select size</option >
                    {rollData?.Sizes.map((item,index) => {
                      return <option key={index} value={item.Size}>{item.Size}</option>;
                    })}
                  </select>
                </td>

                <td>
                  <Link
                    to={`/update-rolls/${rollData._id}`}
                    className="btn btn-success"
                    state={{data:selectedData}}
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
  );
}

export default Rolls;
