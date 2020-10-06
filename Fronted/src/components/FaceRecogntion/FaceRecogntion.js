import React from 'react';
import './FaceRecogntion.css'



const FaceRecogntion =({imageUrl,box})=>{
    return(
       <div className='center ma'>
           <div className='absolute mt2'>
           <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
           <div className='bounding-box' style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}></div>
           </div>
        </div>
          
    ); //pa=space. w-70: wideth 
}




export default FaceRecogntion;