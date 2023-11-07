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
          setSelectedSizes(response.data);
        });

    }
    else return;
  };

  const handleSizeChange = (event) => {
    const finalSelectedSize = event.target.value;
    setSelectedSize(finalSelectedSize);
  };

  const handleDetailsClick = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:8000/details-reels-data/${selectedType}/${selectedSize}`
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
  const handleDelete = (id,weight,vendor) => {
    console.log(weight, vendor)
    axios
      .delete(`http://localhost:8000/delete-reel/${id}?type=${selectedType}&size=${selectedSize}&weightType=${weight}&vendor=${vendor}`)
      .then((data) => {
        Swal.fire("Deleted Successfully!");
        navigate("/reel-products");
      })
      .catch((error) => {
        Swal.fire("Network Error");
      });
  };

  useEffect(() => {
    if (selectedSize && selectedType) {
      setIsDisabled(false);
    }
    else {
      setIsDisabled(true)
    }
  }, [selectedSize, selectedType])

  return (
    <>
      <div className="customForm">
        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6 col-lg-12">
              <div className="form-container">
                <h3 className="title">Reels Stock-Out</h3>
                <form className="form-horizontal" >
                  <div className="form-group">
                    <label className=" pb-1">Type Name</label>
                    <select className="form-select" aria-label="Default select example" onChange={handleTypeChange}>
                      <option value="" selected>Select type</option>
                      {rollTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className=" pb-1">Size</label>
                    <select className="form-select" aria-label="Default select example" onChange={handleSizeChange}>
                      <option value="" selected>Select size</option>
                      {selectedSizes.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-info fw-semibold text-white"
                      type="submit"
                      onClick={(e) => handleDetailsClick(e)}
                      disabled={isDisabled}
                    >View Details</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="customTable">
        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6 col-lg-12">
              <div className="table-container">
                <h3 className="title">Vendors Details</h3>
                <table>
                  <thead>
                    <tr>
                    <th>Image</th>
                      <th>Vendor Name</th>
                      <th>Weight Type</th>
                      <th>Rate</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedWeight?.map((item, index) => (
                      <tr key={index}>
                         <img src={item.imgPath} alt="img"  style={{width:"80px", height:"50px"}}/>
                        <td>{item.vendorName}</td>
                        <td>{item.weight_type}</td>
                        <td>{item.Rate}</td>
                        <td>
                          <button
                            className="btn btn-info text-white fw-semibold"
                            onClick={() => {
                              handleDelete(item._id,item.weight_type,item.vendorName);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default StockOut;
