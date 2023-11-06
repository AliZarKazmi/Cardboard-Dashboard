import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"

import 'bootstrap/dist/css/bootstrap.min.css';


const Edit = () => {
  const { id } = useParams()
  const [cardboardname, setCardboardname] = useState()
  const [rate, setRate] = useState()
  const [length, setLength] = useState()
  const [width, setWidth] = useState()
  const [depth, setDepth] = useState()
  const [quantity, setQuantity] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8000/cardboard/getItem/' + id)
      .then(result => {
        setCardboardname(result.data.cardboardname)
        setRate(result.data.rate)
        setLength(result.data.length)
        setWidth(result.data.width)
        setDepth(result.data.depth)
        setQuantity(result.data.quantity)
        console.log(result)
      })
      .catch(error => console.log(error))
  }, [])

  const Update = (e) => {
    e.preventDefault()
    axios.put("http://localhost:8000/updateItems/" + id, {
      cardboardname,
      rate,
      length,
      width,
      depth,
      quantity
    })
      .then((result) => {
        console.log(result)
        navigate('/products')
      })
      .catch((error) => console.log(error))

  }

  return (
    <>
      <div className="customForm">
        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6 col-lg-12">
              <div className="form-container">
                <h3 className="title">Product Details</h3>
                <form className="form-horizontal" onSubmit={Update}>
                  <div className="form-group">
                    <label>Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Product Name"
                      id="inputProductName" 
                      value={cardboardname} 
                      onChange={(e) => { setCardboardname(e.target.value) }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Rate (Rs.)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Rate in Rs."
                      id="inputRate" 
                      value={rate} 
                      onChange={(e) => { setRate(e.target.value) }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Length (Inches)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Length in inches"
                      id="inputLength" 
                      value={length} 
                      onChange={(e) => { setLength(e.target.value) }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Width (Inches)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Width in inches"
                      id="inputWidth" 
                      value={width} 
                      onChange={(e) => { setWidth(e.target.value) }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Depth (Inches)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Depth in inches"
                      id="inputDepth" 
                      value={depth} 
                      onChange={(e) => { setDepth(e.target.value) }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Update quantity"
                      id="inputQuantity" 
                      value={quantity} 
                      onChange={(e) => { setQuantity(e.target.value) }}
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
  )
}
export default Edit