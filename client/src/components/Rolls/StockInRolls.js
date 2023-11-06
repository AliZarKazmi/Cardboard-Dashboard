import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const StockInRolls = () => {
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
      .get("http://localhost:8000/rolls", { cache: "no-cache" })
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
      .get(`http://localhost:8000/singleroll/${selectedType}`)
      .then((response) => {
        setSelectedSizes(response.data.Sizes);
      });

    console.log("Selected Type Name:", selectedType);
  };
  const handleAddStock = () => {

    axios.put("http://localhost:8000/add-roll-stock", {
      type: selectedType,
      size: selectedSize,
      quantity: quantity
    })
      .then((response) => {
        console.log(response)
        Swal.fire("Stock Upadted Successfully!")
        navigate({ pathname: '/roll-products' })
      })
      .catch((error) => console.log(error))
    // Handle adding stock here

  };
  const handleSizeChange = (event) => {
    const finalSelectedSize = event.target.value;
    setSelectedSize(finalSelectedSize);
    validateInputs(selectedType, finalSelectedSize, quantity);
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
      <div className="customForm">
        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6 col-lg-12">
              <div className="form-container">
                <h3 className="title">Rolls In-Stock</h3>
                <form className="form-horizontal" >
                  <div className="form-group">
                    <label className=" pb-1">Type Name</label>
                    <select className="form-select" aria-label="Default select example" onChange={handleTypeChange}>
                      <option defaultValue="" selected>Select type</option>
                      {rollTypes?.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className=" pb-1">Size</label>
                    <select className="form-select" aria-label="Default select example" onChange={handleSizeChange}>
                      <option defaultValue="" selected>Select size</option>
                      {selectedSizes?.map((item, index) => (
                        <option key={index} value={item.Size}>
                          {item.Size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <h6 className="title pt-2 ps-2">Add stock</h6>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="New stock quantity"
                      id="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-info fw-semibold text-white"
                      type="submit"
                      onClick={handleAddStock}
                      disabled={isButtonDisabled}
                    >Add to Stock</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockInRolls;
