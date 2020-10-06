import React from 'react';

const Navigation =({onRouteChange,isSignedIn})=>{
  
        if(isSignedIn){
            return(
            <nav style ={{display:'flex', justifyContent:'flex-end'}}> 
            <p onClick={()=> onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign out</p> 
        </nav>) //nav=tool bar. f3=size, pa3= space from left, pointer = mouse 
        } else {
            return(
            <nav style ={{display:'flex', justifyContent:'flex-end'}}> 
            <p onClick={()=> onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p> 
            <p onClick={()=> onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p> 
             </nav> //nav=tool bar. f3=size, pa3= space from left, pointer = mouse 
            );
        }    
}




export default Navigation;