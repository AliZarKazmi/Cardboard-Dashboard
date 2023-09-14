import { useParams ,useNavigate} from "react-router-dom"
import axios from "axios"
import { useState,useEffect } from "react"

import 'bootstrap/dist/css/bootstrap.min.css';


const Edit =()=>
{
    const {id} = useParams()
    const [cardboardname,setCardboardname] = useState()
    const [rate,setRate] = useState()
    const [length,setLength] = useState()
    const [width,setWidth] = useState()
    const [depth,setDepth] = useState()
    const [quantity,setQuantity] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('http://localhost:3001/cardboard/getItem/'+id)
    .then(result=>{
        setCardboardname(result.data.cardboardname)
        setRate(result.data.rate)
        setLength(result.data.length)
        setWidth(result.data.width)
        setDepth(result.data.depth)
        setQuantity(result.data.quantity)
        console.log(result)
    })
        .catch(error => console.log(error))
    },[])

    const Update=(e)=>{
        e.preventDefault()
        axios.put("http://localhost:3001/updateItems/"+id,{
            cardboardname,
            rate,
            length,
            width,
            depth,
            quantity
        })
        .then((result)=>
        {
            console.log(result)
            navigate('/products')
        })
        .catch((error)=>console.log(error))

    }

    return (
    <>
    <form  onSubmit={Update} style={{margin:"60px"}}>
  <div className="form-row" >
    
    <div className="form-group col-md-3">
      <label htmlFor="inputName">Product Name</label>
      <input  className="form-control" id="inputProductName"value={cardboardname}  onChange={(e)=>{setCardboardname(e.target.value)}} />
    </div>
    <div className="form-group col-md-3">
      <label htmlFor="inputRate">Rate $</label>
      <input  className="form-control" id="inputRate"  value={rate} onChange={(e)=>{setRate(e.target.value)}}/>
    </div>
  </div>
  <div className="form-group col-md-3">
    <label htmlFor="inputLength">Length inc:</label>
    <input  className="form-control" id="inputLength" value={length}  onChange={(e)=>{setLength(e.target.value)}} />
  </div>
  <div className="form-group col-md-3">
    <label htmlFor="inputWidth">Width inc:</label>
    <input  className="form-control" id="inputWidth"  value={width}  onChange={(e)=>{setWidth(e.target.value)}}/>
  </div>
  <div className="form-row">
    <div className="form-group col-md-3">
      <label htmlFor="inputDepth">Depth inc:</label>
      <input  className="form-control" id="inputDepth" value={depth} onChange={(e)=>{setDepth(e.target.value)}}/>
    </div>
    
    
  <div className="form-group col-md-3">
    <label htmlFor="inputWidth">Quantity</label>
    <input  className="form-control" id="inputQuantity"  value={quantity}  onChange={(e)=>{setQuantity(e.target.value)}}/>
  </div>
  </div>
  
  <button type="submit" className="btn btn-primary">Upload</button>
</form>
    </>
    )
}
export default Edit