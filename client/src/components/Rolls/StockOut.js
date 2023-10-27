import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const StockOutRolls = () => {
  const [rollTypes, setRollTypes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    // Getting all rolls data but first displaying Types of rolls
    axios
      .get("http://localhost:3001/rolls", { cache: "no-cache" })
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
      .get(`http://localhost:3001/singleroll/${selectedType}`)
      .then((response) => {
        setSelectedSizes(response.data.Sizes);
      });

    console.log("Selected Type Name:", selectedType);
  };
  const handleStock = () => {

    axios.put("http://localhost:3001/reduce-roll-stock",{
        type : selectedType,
        size : selectedSize,
        quantity : quantity
    })
    .then((response)=>
    {
        console.log(response)
        Swal.fire("Stock Upadted Successfully!")
             navigate({pathname:'/roll-products'})
    })
    .catch((error)=>console.log(error))
    // Handle adding stock here
   
  };
  const handleSizeChange = (event) => {
    const finalSelectedSize = event.target.value;
    setSelectedSize(finalSelectedSize);
    validateInputs(selectedType, finalSelectedSize, quantity);
    console.log("Selected Size:", finalSelectedSize);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = Number.parseInt(event.target.value);
    setQuantity(newQuantity);
    validateInputs(selectedType, selectedSize, newQuantity);
  };

  const validateInputs = (type, size, quantity) => {
    if (type && size && quantity > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  

  return (
    <>
      <div className="dashboard-content">
        <div
          className="dashboard-content-container"
          style={{ marginTop: "5vh" }}
        >
          <div className="dashboard-content-header">
            <h1>Rools Stock-Out</h1>
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
                      <option key={index} value={item.Size}>
                        {item.Size}
                      </option>
                    ))}
                  </select>
                </td>
              </tbody>
            </table>
          </div>
          <div>
            <div className="dashboard-content-header">
              <h2>Deduct Stock</h2>
            </div>

            <div>
              <label htmlFor="quantity" style={{ margin: "20px" }}>
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                style={{ margin: "20px" }}
                min='0'
              />
            </div>
            <button
              onClick={handleStock}
              className="btn btn-primary"
              disabled={isButtonDisabled}
              style={{ margin: "20px" }}
            >
              Reduce Stock
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockOutRolls;
