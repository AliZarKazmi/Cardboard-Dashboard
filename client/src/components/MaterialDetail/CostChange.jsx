import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CostChange = () => {
  const { id } = useParams();
  const [labor, setLabor] = useState();
  const [rent, setRent] = useState();
  const [printedSides, setPrintedSides] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/costprice/" + id)
      .then((result) => {
        const data =result.data
        setLabor(data.labor);
        setRent(data.rent);
        setPrintedSides(data.printedSides);

        console.log(result);
      })
      .catch((error) => console.log(error));
  }, []);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/update-Cost-Price/" + id, {
        labor,
        rent,
        printedSides,
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
            <label htmlFor="inputLabourCost">Labour Cost</label>
            <input
              className="form-control"
              id="inputLabourCost"
              value={labor}
              onChange={(e) => {
                setLabor(e.target.value);
              }}
            />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="inputRentPrice">Rent Price $</label>
            <input
              className="form-control"
              id="inputRentPrice"
              value={rent}
              onChange={(e) => {
                setRent(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group col-md-3">
          <label htmlFor="inputPrintedSidesCost">Printed Sides Cost:</label>
          <input
            className="form-control"
            id="inputPrintedSidesCost"
            value={printedSides}
            onChange={(e) => {
              setPrintedSides(e.target.value);
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
export default CostChange;
