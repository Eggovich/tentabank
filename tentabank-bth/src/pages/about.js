import { useEffect, useState} from "react";
import useFetch from "react-fetch-hook"


const About = () => {
    const {data} = useFetch('http://localhost:5000/login');
    if (data){
    console.log(data.Hej);}
return (
   
    <div>
        <h3>Under Construction</h3>
    </div>
)};

export default About;
