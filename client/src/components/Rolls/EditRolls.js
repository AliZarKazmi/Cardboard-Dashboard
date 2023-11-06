import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";

const EditRolls = () => {
  const propData = useLocation().state.data;
  const size = propData.size;
  const id = useParams().id;
  const [Quantity, setQuantity] = useState()
  const [Rate, setRate] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`http://localhost:8000/singleroll/${id}/${size}`)
      .then((res) => {
        console.log(res);
        setRate(propData.rate)
        setQuantity(res.data.Quantity)
      });
    // console.log(Quantity)
  }, [id, size]);

  const Update = (e) => {
    e.preventDefault()
    axios.put("http://localhost:8000/updaterolls/" + id, {
      Rate,
      size,
      Quantity,
    })
      .then((result) => {
        console.log(Quantity)
        Swal.fire("Updated Successfully")
        navigate('/roll-products')
      })
      .catch((error) => Swal.fire(error))

  }

  return (
      <div className="customForm">
        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6 col-lg-12">
              <div className="form-container">
                <h3 className="title">Rolls Price</h3>
                <form onSubmit={Update} className="form-horizontal" >
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
                      placeholder="Enter rate"
                      id="inputRentPrice"
                      value={Rate}
                      onChange={(e) => { setRate(e.target.value) }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Size</label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputPrintedSidesCost"
                      value={propData.size}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Quantity (In Stock)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputQuantity"
                      value={Quantity}
                      onChange={(e) => { setQuantity(e.target.value) }}
                      disabled
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn btn-info fw-semibold text-white" type="submit">Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}; export default EditRolls;
