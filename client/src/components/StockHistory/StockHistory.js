import axios from 'axios';
import React, { useEffect, useState } from 'react'

const StockHistory = () => {
    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState("")
    console.log(search)

    useEffect(() => {
        axios
            .get("http://localhost:8000/stock-history", { cache: "no-cache" })
            .then((result) => setHistory(result.data))
            .catch((error) => console.log(error));
    }, []);

    // console.log(history);

    return (
        <>
            <div className="dashboard-content">
                <div className="dashboard-content-container" style={{ marginTop: "5vh" }}>
                    <div className="dashboard-content-header d-flex justify-content-between align-items-start gap-2 flex-column p-3">
                        <h2>Stock History</h2>

                        
                        <input 
                        placeholder='Search content'
                        style={{margin:"10px", width:"40%"}}
                        onChange={(e)=>{setSearch(e.target.value)}}
                        />
                        
                        <table className="table table-hover mt-3">
                            <thead>
                                <tr>
                                    <th scope="col" className=' fw-bolder fs-6 text-primary'>Product </th>
                                    <th scope="col" className=' fw-bolder fs-6 text-primary'>Operation</th>
                                    <th scope="col" className=' fw-bolder fs-6 text-primary'> Type</th>
                                    <th scope="col" className=' fw-bolder fs-6 text-primary'>Size</th>
                                    <th scope="col" className=' fw-bolder fs-6 text-primary'>Time</th>
                                    <th scope="col" className=' fw-bolder fs-6 text-primary'>Reel Weight</th>
                                    <th scope="col" className=' fw-bolder fs-6 text-primary'>Reel Vendor</th>
                                    <th scope="col" className=' fw-bolder fs-6 text-primary'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
  {history &&
    history
      .filter((item) => {
        return search.trim() === "" || // Check if search is empty
          (item.productType && item.productType.toLowerCase().includes(search)) ||
          (item.operation && item.operation.toLowerCase().includes(search)) ||
          (item.categoryType && item.categoryType.toLowerCase().includes(search)) ||
          (item.time && item.time.toLowerCase().includes(search)) ||
          (item.reelVendor && item.reelVendor.toLowerCase().includes(search));
      })
      .map((item, index) => (
        <tr key={index}>
          <th className="text-capitalize">{item.productType}</th>
          <td className="text-capitalize">{item.operation}</td>
          <td className="text-capitalize">{item.categoryType}</td>
          <td className="text-capitalize">{item.productSize}</td>
          <td className="text-capitalize">{item.time}</td>
          <td className="text-capitalize">{item.reelWeight}</td>
          <td className="text-capitalize">{item.reelVendor}</td>
          <td className="text-capitalize">{item.quantity}</td>
        </tr>
      ))}
</tbody>

                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default StockHistory