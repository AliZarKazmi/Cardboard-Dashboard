import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
// import BoxModel from './BoxModel';
import { CameraControls, ContactShadows, Environment, Html, OrbitControls, useProgress } from '@react-three/drei';
import BoxModel from './BoxModel';

const CameraAdjustment = ({ side, btnValue }) => {
  const cameraControlRef = useRef();
  const selectedSide = side;

  function Loader() {
    const { progress } = useProgress()
    return (
      <Html center>
        <h6 className=' text-primary'>{progress.toFixed(0)} % loaded</h6>
        <div className="progress">
          <div 
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={progress.toFixed(0)}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{width: `${progress.toFixed(0)}%`}}
            ></div>
        </div>
      </Html>

    )
  }

  useEffect(() => {
    const cameraControls = cameraControlRef.current;

    if (!cameraControls) return;

    if (selectedSide === 'front') {
      cameraControls.rotateTo(0, Math.PI / 2);
    } else if (selectedSide === 'left') {
      cameraControls.rotateTo(0, Math.PI / 2);
      cameraControls.rotateTo(-Math.PI / 2, Math.PI / 2);
    } else if (selectedSide === 'right') {
      cameraControls.rotateTo(0, Math.PI / 2);
      cameraControls.rotateTo(Math.PI / 2, Math.PI / 2);
    } else if (selectedSide === 'back') {
      cameraControls.rotateTo(0, Math.PI / 2);
      cameraControls.rotateTo(Math.PI, Math.PI / 2);
    } else if (selectedSide === 'bottom') {
      cameraControls.rotateTo(0, Math.PI / 2);
      cameraControls.rotateTo(0, Math.PI);
    }
  }, [selectedSide]);


  return (
    <>
      <Canvas shadows camera={{ fov: 90 }}>
        <Suspense fallback={<Loader />}>
          <CameraControls ref={cameraControlRef} />
          <ambientLight intensity={0.7} />
          <spotLight intensity={0.4} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
            <BoxModel btnValue={btnValue} />
          <Environment preset="city" />
          <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
          <OrbitControls enableZoom={true} enableRotate={true} enablePan={true} />
        </Suspense>
      </Canvas>
    </>
  );
};

export default CameraAdjustment;
