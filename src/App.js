import React, { useState } from 'react' 
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; 
import ResizableRect from 'react-resizable-rotatable-draggable'


import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import './App.css';

function App() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [pdfFile, setPdfFile]=useState(null);
  const [pdfFileError, setPdfFileError]=useState('');
  const [pdfName, setPdfName] = useState("")
  const [pdfSize, setPdfSize] = useState("")
  const [viewPdf, setViewPdf]=useState(null);
  const fileType=['application/pdf'];

  const [width, setWidth] = useState(100)
  const [height, setHeight] = useState(100)
  const [top, setTop] = useState(100)
  const [left, setLeft] = useState(100)
  const [rotateAngle, setRotateAngle] = useState(0)

  
  const handleResize = (style, isShiftKey, type) => {

    let { top, left, width, height } = style
    top = Math.round(top)
    left = Math.round(left)
    width = Math.round(width)
    height = Math.round(height)
    
    setTop(top)
    setLeft(left)
    setWidth(width)
    setHeight(height)
  }

  const handleRotate = (rotateAngle) => {
    setRotateAngle(rotateAngle)
  }

  const handleDrag = (deltaX, deltaY) => {
    setLeft(left + deltaX)
    setTop(top + deltaY)
  }


  const handlePdfFileChange=(e)=>{
    let selectedFile=e.target.files[0];

    if (selectedFile){
      if (selectedFile && fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setPdfFile(e.target.result);
              setPdfFileError('');
              setPdfName(selectedFile["name"])
              let size = selectedFile["size"] / 1000
              setPdfSize(`${size}KB`)
            }
      }
      else{
        setPdfFile(null);
        setPdfFileError('Please select a valid pdf file');
      }
    }
    else{
      console.log('Select your file');
    }
  }

  const handlePdfFileSubmit=(e)=>{
    e.preventDefault();
    if(pdfFile !== null){
      setViewPdf(pdfFile);
    }
    else{
      setViewPdf(null);
    }
  }

  return (
    <div className='container' style = {{marginLeft: 'inherit', maxWidth: '1500px', padding: '20px'}}>

    <br></br>
    
      <form className='form-group' onSubmit={handlePdfFileSubmit}>
        <input type="file" className='form-control'
          required onChange={handlePdfFileChange}
        />
        {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
        <br></br>
        <button type="submit" className='btn btn-success btn-lg'>
          UPLOAD
        </button>
      </form>
      <br></br>
      <h4>View PDF</h4>
      <div className='pdf-container'>
        {viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
          <Viewer fileUrl={viewPdf}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}

      {!viewPdf&&<>No pdf file selected</>}
      </div>

      <div className = 'pdf-container' style = {{width: '40%', backgroundColor: "#ffffff"}}>
    {viewPdf&&<>
      <h3>PDF Name: {pdfName}</h3>
      <h3>PDF Size: {pdfSize}</h3>
      
    </>}
    <h3>Coordinates: X:{top}, Y:{left}</h3>
    <ResizableRect
          left={left}
          top={top}
          width={width}
          height={height}
          rotateAngle={rotateAngle}
          // aspectRatio={false}
          // minWidth={10}
          // minHeight={10}
          zoomable='n, w, s, e, nw, ne, se, sw'
          // rotatable={true}
          // onRotateStart={this.handleRotateStart}
          onRotate={handleRotate}
          // onRotateEnd={this.handleRotateEnd}
          // onResizeStart={this.handleResizeStart}
          onResize={handleResize}
          // onResizeEnd={this.handleUp}
          // onDragStart={this.handleDragStart}
          onDrag={handleDrag}
          // onDragEnd={this.handleDragEnd}
        />
  </div>
      


    </div>
    
  
  );
}

export default App;
