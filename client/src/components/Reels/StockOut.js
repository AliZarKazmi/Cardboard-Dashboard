import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const StockOut = () => {
  const [rollTypes, setRollTypes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedWeight, setSelectedWeight] = useState([]);
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

  const handleSizeChange = (event) => {
    const finalSelectedSize = event.target.value;
    setSelectedSize(finalSelectedSize);
    console.log("Selected Size:", finalSelectedSize);
  };

  const handleDetailsClick = () => {
    axios
      .get(
        `http://localhost:3001/details-reels-data/${selectedType}/${selectedSize}`
      )
      .then((response) => {
        setSelectedWeight(response.data.weight);
        // Handle the response data and update state as needed
      })
      .catch((error) => {
        console.log(error);
        // Handle errors, e.g., display an error message to the user
      });
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

            <div>
              <button
                onClick={handleDetailsClick}
                className="btn btn-primary"
                style={{ margin: "20px" }}
              >
                Details
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Vendor Name</th>
                  <th>Weight Type</th>
                  <th>Rate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedWeight.map((item, index) => (
                  <tr key={index}>
                    <td>{item.vendorName}</td>
                    <td>{item.weight_type}</td>
                    <td>{item.Rate}</td>
                    <td><button>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockOut;
