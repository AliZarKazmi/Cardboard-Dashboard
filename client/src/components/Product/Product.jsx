import axios from "axios";
import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import {Link} from 'react-router-dom'

// import all_orders from "../../constants/orders";
// import { calculateRange, sliceData } from "../../utils/table-pagination";

import "./styles.css";

// import DoneIcon from "../../assets/icons/done.svg";
// import CancelIcon from "../../assets/icons/cancel.svg";
// import RefundedIcon from "../../assets/icons/refunded.svg";

function Product() {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
    // const [page, setPage] = useState(1);
    // const [pagination, setPagination] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((result) => setProduct(result.data))
      .catch((error) => console.log(error));
    // setPagination(calculateRange());
    // setProduct(sliceData());
  }, []);

  // useEffect(() => {
  //     setPagination(calculateRange());
  //     setProduct(sliceData());
  // }, []);

  // Search
  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let search_results = product.filter(
        (item) =>
          item.first_name.toLowerCase().includes(search.toLowerCase()) ||
          item.last_name.toLowerCase().includes(search.toLowerCase()) ||
          item.product.toLowerCase().includes(search.toLowerCase())
      );
      setProduct(search_results);
    }
    //  else {
    //   __handleChangePage(1);
    // }
  };

  // Change Page
  // const __handleChangePage = (new_page) => {
  //     setPage(new_page);
  //     setProduct(sliceData());
  // }

  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="New Order" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Product List</h2>
          <div className="dashboard-content-search">
            <input
              type="text"
              value={search}
              placeholder="Search.."
              className="dashboard-content-input"
              onChange={(e) => __handleSearch(e)}
            />
          </div>
        </div>

        <table>
          <thead>
            <th>Image</th>
            <th>Product Name</th>
            <th>Length (inc)</th>
            <th>Width (inc)</th>
            <th>Depth (inc)</th>
            <th>Rate ($)</th>
            <th>Quantity</th>
            <th>Action</th>
          </thead>

          <tbody>
            {product.map((order, index) => (
              <tr key={index}>
                <td>
                  <div>
                    <img
                      src={order.img}
                      alt="paid-icon"
                      className="dashboard-content-icon"
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                  </div>
                </td>
                <td>{order.cardboardname}</td>
                <td>{order.length}</td>
                <td>{order.width}</td>
                <td>{order.depth}</td>
                {/* <td><span>{order.id}</span></td>   Product Name */}
                <td>{order.rate}</td>
                <td>{order.quantity}</td>
                <td>
                  <Link to={`/update/${order._id}`} className="btn btn-success">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/*                 
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div> */}
      </div>
    </div>
  );
}

export default Product;
