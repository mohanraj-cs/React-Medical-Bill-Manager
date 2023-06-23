import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../non-app-css/styles.css";

const AddPerformance = () => {

    const location = useLocation()

    const consultantNo = location.pathname.split("/")[2];

    const [newPerformance, setNewPerformance] = useState({

        MonitorDate: "",
        grade: "",
        nonconsultantNo: consultantNo
        
    });

    const navigate = useNavigate()

    const handleChange = (e) => {

        setNewPerformance(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e => {

        e.preventDefault()

        try{

            await axios.post("https://nice-pink-coral-tam.cyclic.app/performances", newPerformance)
            navigate(`/Performance/${consultantNo}`)

        } catch(err){

            console.log(err)
        }
    }

    console.log(newPerformance)

    return (

        <div className = "form">
            <h1>Add New Performance</h1>
            <label for = "monitoringDate">Monitor Date</label>
            <input id = "monitoringDate" type = "date" onChange = {handleChange} name = "MonitorDate"/>
            <input type = "text" placeholder = "Grade" onChange = {handleChange} name = "grade"/>
            <button class = "btn manageBtn-outline-primary" onClick = {handleClick}>Add</button>
        </div>
    )
}

export default AddPerformance