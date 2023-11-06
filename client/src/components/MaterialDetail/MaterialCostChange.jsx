import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MaterialCostChange = () => {
  const { id } = useParams();
  const [materialName, setMaterialName] = useState();
  const [paperRate, setPaperRate] = useState();
  const [rollRate, setRollRate] = useState();
  const [gamrige, setGamrige] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/material-Cost-Price/" + id)
      .then((result) => {
        const data = result.data
        setMaterialName(data.materailName);
        setPaperRate(data.paperRate);
        setRollRate(data.rollRate);
        setGamrige(data.gamrige)
        console.log(result);
      })
      .catch((error) => console.log(error));
  }, []);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8000/update-material-Cost-Price/" + id, {
        materialName,
        paperRate,
        rollRate,
        gamrige,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="customForm">
        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6 col-lg-12">
              <div className="form-container">
                <h3 className="title">Material Costs</h3>
                <form className="form-horizontal" onSubmit={Update}>
                  <div className="form-group">
                    <label>Material Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Material Name"
                      id="inputMaterialName"
                      value={materialName}
                      onChange={(e) => {
                        setMaterialName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Paper Rate (Rs.)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Paper rate in Rs."
                      id="inputPaperRate"
                      value={paperRate}
                      onChange={(e) => {
                        setPaperRate(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Roll Rate (Rs.)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Roll rate in Rs."
                      id="inputRollRate"
                      value={rollRate}
                      onChange={(e) => {
                        setRollRate(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Gamrige</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Gamrige"
                      id="inputGamrige"
                      value={gamrige} 
                      onChange={(e) => {
                        setGamrige(e.target.value);
                      }}
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
    </>
  );
};
export default MaterialCostChange;
