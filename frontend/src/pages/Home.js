import axios from "axios";
import {useEffect,useState} from "react";
export default function Home(){
const [h,setH]=useState([]);
useEffect(()=>{axios.get("http://localhost:5000/api/hotels").then(r=>setH(r.data));},[]);
return(<div>{h.map(x=><div key={x._id}>{x.name}</div>)}</div>);
}