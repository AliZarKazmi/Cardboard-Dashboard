import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader";
import { Link } from "react-router-dom";

function OrderDetail() {
  const { id } = useParams();

  const [search, setSearch] = useState("");
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/orderDetails/" + id)
      .then((result) => {
        setProduct(result.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  // Search
  // const __handleSearch = (event) => {
  //   setSearch(event.target.value);
  //   if (event.target.value !== "") {
  //     let search_results = product.filter(
  //       (item) =>
  //         item.first_name.toLowerCase().includes(search.toLowerCase()) ||
  //         item.last_name.toLowerCase().includes(search.toLowerCase()) ||
  //         item.product.toLowerCase().includes(search.toLowerCase())
  //     );
  //     setProduct(search_results);
  //   }
  // };

  return (
    <>
      {console.log(product)}
      <div className="dashboard-content">
        <DashboardHeader btnText="New Order" />

        <div className="dashboard-content-container">
          <div className="dashboard-content-header">
            <h2>Order List</h2>
            <div className="dashboard-content-search">
              {/* <input
                type="text"
                value={search}
                placeholder="Search.."
                className="dashboard-content-input"
                onChange={(e) => __handleSearch(e)}
              /> */}
            </div>
          </div>

          <table>
            <tr>
              {/* <th>Client Name</th> */}
              <th>Product Name</th>
              <th>L x W x D (inc)</th>
              <th>Material</th>
              <th>Quantity</th>
              <th>Printed Sides</th>
            </tr>

            {product.items?.map((order, index) => {
              return (
                <>
                  <tr >
                    <td>{order.name}</td>
                    <td>{order.length} x {order.width} x {order.depth} </td>
                    <td>{order.material}</td>
                    <td>{order.quantity}</td>
                    <td>{order.sides }</td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
