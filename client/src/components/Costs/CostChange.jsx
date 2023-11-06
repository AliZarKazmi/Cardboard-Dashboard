import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"

import 'bootstrap/dist/css/bootstrap.min.css';


const CostChange = () => {
  const { id } = useParams()
  const [labor, setLabor] = useState() 
  const [rent, setRent] = useState()
  const [printedSides, setPrintedSides] = useState()
  const [imagePrintedSides, setImagePrintedSides] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8000/costprice/' + id)
      .then(result => {
        setLabor(result.data.labor)
        setRent(result.data.rent)
        setPrintedSides(result.data.printedSides)
        setImagePrintedSides(result.data.imagePrintedSide)
      })
      .catch(error => console.log(error))
  }, [])

  const Update = (e) => {
    e.preventDefault()
    axios.put("http://localhost:8000/update-Cost-Price/" + id, {
      labor,
      rent,
      printedSides,
      imagePrintedSides
    })
      .then((result) => {
        console.log(result)
        navigate('/')
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
                <h3 className="title">Costs Estimations</h3>
                <form onSubmit={Update} className="form-horizontal" >
                  <div className="form-group">
                    <label>Labour Cost (Rs.)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Labour cost in Rs."
                      id="inputLabourCost"
                      value={labor}
                      onChange={(e) => { setLabor(e.target.value) }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Rent Price (Rs.)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Rent price in Rs."
                      id="inputRentPrice"
                      value={rent}
                      onChange={(e) => { setRent(e.target.value) }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Printed Sides Cost (Rs.)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Printed sides cost in Rs."
                      id="inputPrintedSidesCost"
                      value={printedSides}
                      onChange={(e) => {
                        setPrintedSides(e.target.value)
                      }}
                    />
                  </div>


                  <div className="form-group">
                    <label>Image Printed Sides Cost (Rs.)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Printed sides cost in Rs."
                      id="inputPrintedSidesCost"
                      value={imagePrintedSides}
                      onChange={(e) => {
                        setImagePrintedSides(e.target.value)
                      }}
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
export default CostChange