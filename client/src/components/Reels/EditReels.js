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
    axios.get(`http://localhost:3001/singlereel/${id}/${size}`).then((res) => {
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
    <div style={{ margin: "60px" }}>
      <div className="form-row">
        <div className="form-group col-md-3">
          <label htmlFor="inputLabourCost">Type</label>
          <input
            className="form-control"
            id="inputLabourCost"
            value={propData.typeName}
            readOnly
          />
        </div>
      </div>
      <div className="form-group col-md-3">
        <label htmlFor="inputPrintedSidesCost">Size:</label>
        <input
          className="form-control"
          id="inputPrintedSidesCost"
          value={propData.size}
          readOnly
        />
      </div>
      <div className="form-group col-md-3">
        <label htmlFor="inputPrintedSidesCost">Weight:</label>
        <select onChange={handleWeightChange}>
          <option value="">Select Weight</option>
          {uniqueWeight.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        {selectedWeight && (
          <table className="table">
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {Weight.filter((item) => item.weight_type == selectedWeight).map(
                (vendor, index) => (
                  <tr key={index}>
                    <td>{vendor.vendorName}</td>
                    <td>
                      <UpdateRateInput vendor={vendor} size={size} id={id} />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EditReels;
