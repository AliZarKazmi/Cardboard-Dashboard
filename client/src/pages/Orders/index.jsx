import axios from "axios";
import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { Link } from "react-router-dom";

// import all_orders from "../../constants/orders";
// import { calculateRange, sliceData } from "../../utils/table-pagination";

// import "../Orders/";

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
      .get("http://localhost:8000/orders")
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
          <h2>Order List</h2>
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
          <tr>
            {/* <th>Client Id</th> */}
            <th>Client Name</th>
            <th>Email</th>
            <th>Shipping Address</th>
            <th>Phone Number</th>
            <th>Total Amount</th>
            <th>Card Number</th>
            <th>Action </th>
            {/* <th>Phone Number</th> */}
            {/* <th>Product Name</th>
            <th>Length (inc)</th>
            <th>Width (inc)</th>
            <th>Depth (inc)</th> */}
          </tr>

          {product.map((order, index) => {
            return (
              <>
                <tr key={index}>
                  <td>{order.client?.name}</td> 
                  <td>{order.client?.email}</td>
                  <td>{order.shipping?.address}</td>
                  <td>{order.client?.phone}</td>
                  <td>Rs. {order.items[0]?.price}</td>
                  <td>{order.payment?.cardNumber}</td> 
{/* 
                  {order.items.map((item, index) => {
                    return (
                      <td key={index} slot="cell">
                        {item.name}
                      </td>
                    );
                  })} */}

                  <td>
                    <Link
                      to={`/orderDetails/${order._id}`}
                      className="btn btn-info fw-semibold text-white"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Product;
