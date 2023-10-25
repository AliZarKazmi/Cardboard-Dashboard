import { useParams, useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect,useState } from "react";
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";

const EditReels
 = () => {
  const propData = useLocation().state.data;
  const size = propData.size;
  const id = useParams().id;
  const [Weight,setWeight] = useState()
  const [Rate, setRate]=useState()
  const navigate = useNavigate()
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/singlereel/${id}/${size}`)
      .then((res) => {
        console.log(res);
        setRate(propData.rate)
        setWeight(res.data.Weight ) 
    });
    console.log(Weight)
  }, [id, size]);

  const Update=(e)=>{
    e.preventDefault()
    axios.put("http://localhost:3001/updatereels/"+id,{
        Rate,
        size,
        Weight,
    })
    .then((result)=>
    {
        console.log(Weight)
        Swal.fire("Updated Successfully")
        navigate('/reel-products')
    })
    .catch((error)=>Swal.fire(error))

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
          <label htmlFor="inputQuantity">Weight:</label>
          <input
            className="form-control"
            id="inputQuantity"
            value={Weight}
            onChange={(e)=>{setWeight(e.target.value)}}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
    </div>
  );
};export default EditReels
;
