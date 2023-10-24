import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect,useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

const EditRolls = () => {
  const propData = useLocation().state.data;
  const size = propData.size;
  const id = useParams().id;
  const [Quantity,setQuantity] = useState()
  const [Rate, setRate]=useState()
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/singleroll/${id}/${size}`)
      .then((res) => {
        console.log(res);
        setRate(propData.rate)
        setQuantity(res.data.Quantity ) 
    });
    // console.log(Quantity)
  }, [id, size]);

  const Update=(e)=>{
    e.preventDefault()
    axios.put("http://localhost:3001/updaterolls/"+id,{
        Rate,
        size,
        Quantity,
    })
    .then((result)=>
    {
        console.log(Quantity)
        // navigate('/products')
    })
    .catch((error)=>console.log(error))

}
  
  return (
    <div>

      <form onSubmit={Update} style={{ margin: "60px" }}>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="inputLabourCost">Type</label>
            <input
              className="form-control"
              id="inputLabourCost"
              value={propData.typeName}
              disabled
            />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="inputRentPrice">Rate Rs</label>
            <input
              className="form-control"
              id="inputRentPrice"
              value={Rate}
              onChange={(e)=>{setRate(e.target.value)}}
            />
          </div>
        </div>
        <div className="form-group col-md-3">
          <label htmlFor="inputPrintedSidesCost">Size:</label>
          <input
            className="form-control"
            id="inputPrintedSidesCost"
            value={propData.size}
            disabled
          />
        </div>
        <div className="form-group col-md-3">
          <label htmlFor="inputQuantity">Quantity:</label>
          <input
            className="form-control"
            id="inputQuantity"
            value={Quantity}
            onChange={(e)=>{setQuantity(e.target.value)}}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
    </div>
  );
};export default EditRolls;
