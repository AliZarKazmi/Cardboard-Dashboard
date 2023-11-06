import axios from "axios";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import "./rolls.css"; // Import your CSS file
import EditRolls from "./EditRolls";

function Rolls() {
  const [roll, setRoll] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/rolls", { cache: "no-cache" })
      .then((result) => setRoll(result.data))
      .catch((error) => console.log(error));
  }, []);

  const [selectedDataArray, setSelectedDataArray] = useState(Array(roll.length).fill(null));

  const handleSizeChange = (event, index) => {
    const selectedSize = roll[index];
    const updatedSelectedData = [...selectedDataArray];
    if (event.target.value) {
      updatedSelectedData[index] = {
        typeName: selectedSize.Type,
        rate: selectedSize.Rate,
        size: event.target.value,
      };
    } else {
      updatedSelectedData[index] = null;
    }
    setSelectedDataArray(updatedSelectedData);
  };

  const linkHandle = (event, index) => {
    if (!selectedDataArray[index]) {
      event.preventDefault();
    }
  };

  return (
    <div className="dashboard-content">
      <div className="dashboard-content-container" style={{ marginTop: "5vh" }}>
        <div className="dashboard-content-header">
          <h2>Rolls Attributes</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
          <div style={{ marginRight: "40px" }} >
            <Link
              to={`/stock-in-rolls`}
              className="btn btn-primary text-white fw-semibold"
            >
              Stock-In
            </Link>
          </div>
          <div style={{ marginRight: "40px" }}> <Link
            to={`/stock-out-rolls`}
            className="btn btn-primary text-white fw-semibold"
          >
            Stock-Out
          </Link>
          </div>
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
                    <option value="">Select size</option>
                    {rollData?.Sizes.map((item, index) => {
                      return <option key={index} value={item.Size}>{item.Size}</option>;
                    })}
                  </select>
                </td>

                <td>
                  <Link
                    to={`/update-rolls/${rollData._id}`}
                    className="btn btn-info text-white fw-semibold"
                    state={{ data: selectedDataArray[index] }}
                    style={{ background: selectedDataArray[index] ? '#0dcaf0' : '#51A1B1' }}
                    onClick={(event) => linkHandle(event, index)}
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
