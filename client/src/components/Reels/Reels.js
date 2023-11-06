import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Reels() {
  const [rolls, setRolls] = useState([]);
  const [selectedDataArray, setSelectedDataArray] = useState(Array(rolls.length).fill(null));

  useEffect(() => {
    axios
      .get("http://localhost:8000/reels", { cache: "no-cache" })
      .then((result) => setRolls(result.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSizeChange = (event, index) => {
    const selectedSize = rolls[index];
    const updatedSelectedData = [...selectedDataArray];
    if (event.target.value) {
      updatedSelectedData[index] = {
        typeName: selectedSize.Type,
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
          <h2>Reels Attributes</h2>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ marginRight: "40px" }}>
            <Link
              to={`/stock-in-reels`}
              className="btn btn-primary text-white fw-semibold"
            >
              Stock-In
            </Link>
          </div>
          <div style={{ marginRight: "40px" }}>
            <Link
              to={`/stock-out-reels`}
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
              <th>Size</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {rolls.map((rollData, index) => (
              <tr key={index}>
                <td>{rollData.Type}</td>
                <td>
                  <select onChange={(e) => handleSizeChange(e, index)}>
                    <option value="">Select size</option>
                    {rollData?.Sizes.map((item, sizeIndex) => {
                      return (
                        <option key={sizeIndex} value={item.Size}>
                          {item.Size}
                        </option>
                      );
                    })}
                  </select>
                </td>

                <td>
                  <Link
                    to={`/update-reels/${rollData._id}`}
                    className="btn btn-info text-white fw-semibold"
                    style={{
                      background: selectedDataArray[index] ? "#0dcaf0" : "#51A1B1",
                    }}
                    state={{ data: selectedDataArray[index] }}
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

export default Reels;
