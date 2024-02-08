import React, { useEffect, useState } from 'react';
import axios from 'axios';

function List() {
    const [content,setContent] = useState([])

    useEffect(()=>{
        axios.get('https://server-vovq.onrender.com/get-data')
        .then((res)=>setContent(res.data))
        .catch((err)=>console.error(err.message))
        console.log(content)
    },[])
  return (
    <div>
      
    </div>
  )
}

export default List
