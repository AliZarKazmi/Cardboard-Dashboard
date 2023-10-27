import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ReelsStockIn = () => {
  const [rollTypes, setRollTypes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [Rate, setRate] = useState(0);
  const [weight, setWeight] = useState(0);
  const [vendorName, setVendorName] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    // Getting all reels data but first displaying Types of reels
    axios
      .get("http://localhost:3001/reels", { cache: "no-cache" })
      .then((result) => {
        // Extract the Type values from the result data
        const types = result.data.map((item) => item.Type);
        setRollTypes(types);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedType(selectedType);

    axios
      .get(`http://localhost:3001/stock-in-singlereel/${selectedType}`)
      .then((response) => {
        console.log(response);
        setSelectedSizes(response.data);
      });

    console.log("Selected Type Name:", selectedType);
  };
  //need modification
  const handleAddStock = () => {
    console.log(selectedType, selectedSize, Rate, vendorName);

    axios
      .post("http://localhost:3001/add-reel", {
        type: selectedType,
        size: selectedSize,
        weightData: [
          {
            Rate,
            vendorName,
            weight,
          },
        ],
      })
      .then((response) => {
        console.log(response.data);
        // Swal.fire("Stock Upadted Successfully!")
        //      navigate({pathname:'/roll-products'})
      })
      .catch((error) => console.log(error));
    // // Handle adding stock here
  };

  const handleSizeChange = (event) => {
    const finalSelectedSize = event.target.value;
    setSelectedSize(finalSelectedSize);
    console.log("Selected Size:", finalSelectedSize);
  };

  const handleVendorNameChange = (event) => {
    const finalSelectedVendorName = event.target.value;
    setVendorName(finalSelectedVendorName);

    console.log("Selected Size:", finalSelectedVendorName);
  };
  const handleRateChange = (event) => {
    const newRate = Number.parseInt(event.target.value);
    setRate(newRate);
  };

  const handleWeightChange = (event) => {
    const newWeight = Number.parseInt(event.target.value);
    setWeight(newWeight);
  };

  return (
    <>
      <div className="dashboard-content">
        <div
          className="dashboard-content-container"
          style={{ marginTop: "5vh" }}
        >
          <div className="dashboard-content-header">
            <h1>Reels Stock-In</h1>
          </div>

          <div>
            <table>
              <thead>
                <tr>
                  <th>Type Name</th>
                  <th>Size</th>
                </tr>
              </thead>

              <tbody>
                <td>
                  <select onChange={handleTypeChange}>
                    <option value="">Select Type</option>
                    {rollTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select onChange={handleSizeChange}>
                    <option value="">Select Size</option>
                    {selectedSizes.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </td>
              </tbody>
            </table>
          </div>
          <div>
            <div className="dashboard-content-header">
              <h2>Adding Stock</h2>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1, marginRight: "10px" }}>
                <label htmlFor="vendorName" style={{ margin: "10px" }}>
                  Vendor Name:
                </label>
                <input
                  type="text"
                  id="vendorName"
                  value={vendorName}
                  onChange={handleVendorNameChange}
                  style={{ margin: "5px", width: "100%" }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label htmlFor="Rate" style={{ margin: "10px" }}>
                  Weight:
                </label>
                <input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={handleWeightChange}
                  style={{ margin: "5px", width: "100%" }}
                  min="0"
                />
              </div>

             
              <div style={{ flex: 1 }}>
                <label htmlFor="Rate" style={{ margin: "10px" }}>
                  Rate:
                </label>
                <input
                  type="number"
                  id="Rate"
                  value={Rate}
                  onChange={handleRateChange}
                  style={{ margin: "5px", width: "100%" }}
                  min="0"
                />
              </div>
            </div>

            <button
              onClick={handleAddStock}
              className="btn btn-primary"
              style={{ margin: "20px" }}
            >
              Add Stock
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReelsStockIn;
