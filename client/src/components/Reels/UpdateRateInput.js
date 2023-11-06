import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateRateInput = ({ vendor, size, id }) => {
  const navigate = useNavigate();
  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8000/updatereels/" + id, {
        Rate,
        size,
        vendorId: vendor._id,
      })
      .then((result) => {
        // console.log(result);
        Swal.fire("Price Updated Successfully!")
        navigate("/reel-products");
      })
      .catch();
  };
  const [Rate, setRate] = useState(vendor.Rate);
  useEffect(()=>{
    setRate(vendor.Rate)
  },[vendor])
  return (
    <form onSubmit={Update} className=" d-flex justify-content-start align-items-center gap-2">
      <input
        type="number"
        className=" form-control w-50"
        value={Rate}
        onChange={(e) => {
          setRate(e.target.value);
        }}
      />
      <button type="submit" className="btn btn-primary">
        Update Rate
      </button>
    </form>
  );
};

export default UpdateRateInput;
