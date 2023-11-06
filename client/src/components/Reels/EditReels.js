import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import UpdateRateInput from "./UpdateRateInput";


const EditReels = () => {
  const propData = useLocation().state.data;
  const size = propData.size;
  const id = useParams().id;
  const [Weight, setWeight] = useState([]);
  const [uniqueWeight, setUniqueWeight] = useState([]);
  const [selectedWeight, setSelectedWeight] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8000/singlereel/${id}/${size}`).then((res) => {
      const weightList = [];
      res.data.Weight.map((obj) => {
        weightList.push(obj.weight_type);
      });
      setWeight(res.data.Weight);
      setUniqueWeight([...new Set(weightList)]);
    });
  }, [id, size]);

  const handleWeightChange = (event) => {
    const finalSelectedWeight = event.target.value;
    setSelectedWeight(finalSelectedWeight);
  };

  return (
    <div className=" d-flex justify-content-between align-items-center flex-column">

      <div className="customForm">
        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6 col-lg-12">
              <div className="form-container">
                <h3 className="title">Reels Price</h3>
                <form className="form-horizontal" >
                  <div className="form-group">
                    <label>Roll Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputLabourCost"
                      value={propData.typeName}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Rate (Rs.)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputPrintedSidesCost"
                      value={propData.size}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label className=" pb-1">Weights</label>
                    <select className="form-select" aria-label="Default select example" onChange={handleWeightChange}>
                      <option defaultValue="" selected>Select weight</option>
                      {uniqueWeight.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-100 d-flex justify-content-between align-items-center flex-column">
        {selectedWeight && (
          <div className="customTable">
            <div className="container">
              <div className="row">
                <div className="col-md-offset-3 col-md-6 col-lg-12">
                  <div className="table-container">
                    <h3 className="title">Vendors Details</h3>
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Vendor Name</th>
                          <th>Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Weight.filter((item) => item.weight_type == selectedWeight).map(
                          (vendor, index) => (
                            <tr key={index}>

            <img src={vendor.imgPath} alt="img"  style={{width:"80px", height:"50px"}}/>
                              <td>{vendor.vendorName}</td>
                              <td>
                                <UpdateRateInput vendor={vendor} size={size} id={id} />
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>



    </div>
  );
};

export default EditReels;
