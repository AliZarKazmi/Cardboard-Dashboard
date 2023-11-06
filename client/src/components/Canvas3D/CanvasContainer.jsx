import React, { useEffect, useState } from "react"
import CameraAdjustment from "./CameraAdjustment"


const CanvasContainer = () => {

    useEffect(() => {
        document.querySelector('#flexSwitchCheckDefault').click();
    }, [])

    const [side, setSide] = useState();
    const [openClose, setOpenClose] = useState();

  return ( 
    <>
        <div className=" d-flex justify-content-center align-items-center flex-column ">

            <div className=" mt-2">
                <ul className=" d-flex justify-content-center align-items-center flex-row gap-2 list-unstyled">
                    <li className=" fs-6 fw-semibold text-secondary p-2 bg-white rounded">Select side:</li>

                    <select className="sideSelection form-select fw-semibold p-2"
                        aria-label="Default select example"
                        style={{width: 6+"rem"}}
                        onChange={(e)=>setSide(e.target.value)}
                    >
                        <option value={false}>Select</option>
                        <option value="front">Front</option>
                        <option value="left">Left</option>
                        <option value="back">Back</option>
                        <option value="right">Right</option>
                        <option value="bottom">Bottom</option>
                    </select>
                    
                </ul>
            </div>

            <div className=" w-100 mt-2" style={{height: 75+'vh'}}>
                <CameraAdjustment side={side} btnValue={openClose} />
            </div>

            <div className=" d-flex justify-content-center align-items-center flex-row gap-4">
                <p className=" fs-6 fw-semibold mt-3 text-secondary">Closed</p>
                <div className="form-check form-switch">
                    <input className="form-check-input custom pt-3 pb-3 ps-5 pe-5 "
                        type="checkbox" role="switch" id="flexSwitchCheckDefault" 
                        onChange={(e)=>setOpenClose(e.target.checked)}
                    />
                </div>
                <p className=" fs-6 fw-semibold mt-3 text-secondary">Open</p>
            </div>

        </div>
    </>
  )
}

export default CanvasContainer