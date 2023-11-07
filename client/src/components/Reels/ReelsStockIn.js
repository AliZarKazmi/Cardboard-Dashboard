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
  const [img, setImg] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Getting all reels data but first displaying Types of reels
    axios
      .get("http://localhost:8000/reels", { cache: "no-cache" })
      .then((result) => {
        // Extract the Type values from the result data
        const types = result.data.map((item) => item.Type);
        setRollTypes(types);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleTypeChange = (event) => {
    if (event.target.value) {
      const selectedType = event.target.value;
      setSelectedType(selectedType);

      axios
        .get(`http://localhost:8000/stock-in-singlereel/${selectedType}`)
        .then((response) => {
          // console.log(response);
          setSelectedSizes(response.data);
        });
    } else return;
  };

  const handleAddStock = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", img);
    formData.append("type", selectedType);
    formData.append("size", selectedSize);
    formData.append(
      "weightData",
      JSON.stringify([
        {
          vendorName,
          Rate,
          weight_type: weight,
        },
      ])
    );

    axios
      .post("http://localhost:8000/add-reel", formData)
      .then((response) => {
        Swal.fire("Stock Upadted Successfully!");
        navigate({ pathname: "/reel-products" });
      })
      .catch((error) => console.log(error));
    // Handle adding stock here
  };

  const handleSizeChange = (event) => {
    const finalSelectedSize = event.target.value;
    setSelectedSize(finalSelectedSize);
  };

  const handleVendorNameChange = (event) => {
    const finalSelectedVendorName = event.target.value;
    setVendorName(finalSelectedVendorName);
  };
  const handleRateChange = (event) => {
    const newRate = Number.parseInt(event.target.value);
    setRate(newRate);
  };

  const handleWeightChange = (event) => {
    const newWeight = event.target.value;
    setWeight(newWeight);
  };

  const handleImgChange = (event) => {
    const newImg = event.target.files[0];
    setImg(newImg);
  };

  useEffect(() => {
    if (selectedSize && selectedType && vendorName && Rate && weight) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [selectedSize, selectedType, vendorName, Rate, weight]);
  return (
    <>
      <div className="customForm">
        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6 col-lg-12">
              <div className="form-container">
                <h3 className="title">Reels Stock-In</h3>
                <form className="form-horizontal" id="upload_reel">
                  <div className="form-group">
                    <label className=" pb-1">Type Name</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleTypeChange}
                    >
                      <option value="" selected>
                        Select type
                      </option>
                      {rollTypes?.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className=" pb-1">Size</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleSizeChange}
                    >
                      <option value="" selected>
                        Select size
                      </option>
                      {selectedSizes?.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <h6 className="title pt-2 ps-2">Add stock</h6>
                  <div className="form-group">
                    <label>Vendor Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter vendor name"
                      id="vendorName"
                      value={vendorName}
                      onChange={handleVendorNameChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Weight</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter reel weight"
                      id="weight"
                      value={weight}
                      onChange={handleWeightChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Rate</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter reel rate"
                      id="Rate"
                      value={Rate}
                      onChange={handleRateChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Upload Image</label>

                    <input
                      type="file"
                      accept="image/*"
                      className=" form-control"
                      onChange={handleImgChange}
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-info fw-semibold text-white"
                      type="submit"
                      onClick={handleAddStock}
                      disabled={isDisabled}
                    >
                      Add to Stock
                    </button>
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

export default ReelsStockIn;
