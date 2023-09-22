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
      .get("http://localhost:3001/material-Cost-Price/" + id)
      .then((result) => {
        const data =result.data
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
      .put("http://localhost:3001/update-material-Cost-Price/" + id, {
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
      <form onSubmit={Update} style={{ margin: "60px" }}>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="inputMaterialName">Material Name</label>
            <input
              className="form-control"
              id="inputMaterialName"
              value={materialName}
              onChange={(e) => {
                setMaterialName(e.target.value);
              }}
            />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="inputPaperRate">Paper Rate $</label>
            <input
              className="form-control"
              id="inputPaperRate"
              value={paperRate}
              onChange={(e) => {
                setPaperRate(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group col-md-3">
          <label htmlFor="inputRollRate">Roll Rate:</label>
          <input
            className="form-control"
            id="inputRollRate"
            value={rollRate}
            onChange={(e) => {
              setRollRate(e.target.value);
            }}
          />
        </div>

        <div className="form-group col-md-3">
          <label htmlFor="inputGamrige">Gamrige:</label>
          <input
            className="form-control"
            id="inputGamrige"
            value={gamrige}
            onChange={(e) => {
              setGamrige(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
    </>
  );
};
export default MaterialCostChange;
