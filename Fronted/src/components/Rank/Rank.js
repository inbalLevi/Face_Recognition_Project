import React from 'react';


const Rank =({name,entries})=>{
    return(
       <div>
           <div className='white f3'>
             {`${name}, your current entry count is...`}  
            </div>
            <div className='white f1'>
             {entries}  
            </div>
       </div>
    ); //pa=space. w-70: wideth 
}




export default Rank;