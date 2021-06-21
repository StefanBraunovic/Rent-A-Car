import React, { useEffect, useState } from 'react';
import {  me } from '../../services/account';
import './Home.scss'



const Home = ()=>{
const [userName, setUserName] = useState();

const account =  me().then((r)=>{
    setUserName(r.data.name)
  })
  
    return <div style={{textAlign:'center' ,backgroundColor:'skyblue'}}>
        <h1 style={{fontSize:'4vh'}}>Welcome {userName} </h1>
        <div class="cybertruck">
	<div class="tire tire--front"></div>
	<div class="tire tire--back"></div>
	<div class="edge"></div>
	<div class="window">
		<div class="crack"></div>
	</div>
</div>
     
    
    </div>
}

export default Home;